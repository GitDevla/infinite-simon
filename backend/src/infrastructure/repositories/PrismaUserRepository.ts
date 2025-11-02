import { PrismaClient } from "@prisma/client";
import { IUserRepository, User, UserPlacement, UserScores, UserScoresQuery } from "../../interfaces/repositories/IUserRepository";

export class PrismaUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async getUserByUsername(username: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }

    async getUserById(userId: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id: userId },
        });
    }

    async create(username: string, email: string, passwordHash: string, avatarUri: string = ""): Promise<User> {
        return this.prisma.user.create({
            data: { 
                username, 
                email, 
                password_hash: passwordHash, 
                avatar_uri: avatarUri 
            },
        });
    }

    async update(userId: number, data: Partial<User>): Promise<User> {
        return this.prisma.user.update({
            where: { id: userId },
            data,
        });
    }

    async delete(userId: number): Promise<void> {
        await this.prisma.user.delete({
            where: { id: userId },
        });
    }

    async updateLastLogin(userId: number, date: Date): Promise<User> {
        return this.prisma.user.update({
            where: { id: userId },
            data: { last_login: date },
        });
    }

    async getUserScores(userId: number): Promise<any[]> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        
        return this.prisma.participant.findMany({
            where: { userId: user.id },
            orderBy: { achieved_at: "desc" },
        });
    }

    async getUserPlacementInMatch(userId: number, matchId: number): Promise<UserPlacement> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        
        const participants = await this.prisma.participant.findMany({
            where: { matchId },
            orderBy: { round_eliminated: "desc" },
        });
        
        const placement = participants.findIndex(p => p.userId === user.id) + 1;
        return { placement, total: participants.length };
    }

    async getTotalGamesPlayed(userId: number): Promise<number> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        
        return this.prisma.participant.count({
            where: { userId: user.id },
        });
    }

    async getBestScore(userId: number): Promise<number | null> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        
        const bestParticipant = await this.prisma.participant.findFirst({
            where: { userId: user.id },
            orderBy: { round_eliminated: "desc" },
        });
        
        return bestParticipant ? bestParticipant.round_eliminated : null;
    }

    async getAverageScore(userId: number): Promise<number | null> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        
        const participants = await this.prisma.participant.findMany({
            where: { userId: user.id },
        });
        
        if (participants.length === 0) return null;
        
        const totalScore = participants.reduce((sum, p) => sum + p.round_eliminated, 0);
        return totalScore / participants.length;
    }

    async getMultiPlayerStats(userId: number): Promise<number> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        
        return this.prisma.participant.count({
            where: {
                userId: user.id,
                match: {
                    game: {
                        modeId: 2, // TODO: remove hardcoding
                    },
                },
            },
        });
    }

    async getUserScoresWithFilters(query: UserScoresQuery): Promise<UserScores[]> {
        const { userId, mode, diff, limit = 5, page = 1, orderBy = "achieved_at" } = query;

        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");

        // Build filter
        const where: any = { userId: user.id };
        if (mode) {
            where.match = {
                game: {
                    mode: {
                        name: mode
                    }
                }
            };
        }
        if (diff) {
            where.match = {
                ...where.match,
                game: {
                    ...where.match?.game,
                    difficulty: {
                        name: diff
                    }
                }
            };
        }

        // Get page info
        const participants = await this.prisma.participant.findMany({
            where,
            orderBy: { [orderBy]: "desc" },
            skip: (page - 1) * limit,
            take: limit,
            include: {
                match: {
                    include: {
                        game: {
                            include: {
                                mode: true,
                                difficulty: true
                            }
                        }
                    }
                }
            }
        });

        const matchIds = participants.map(p => p.matchId);
        const allMatchParticipants = await this.prisma.participant.findMany({
            where: {
                matchId: { in: matchIds }
            },
            orderBy: { round_eliminated: "desc" }
        });

        // Calculate placement
        const scores = participants.map(p => {
            const matchParticipants = allMatchParticipants.filter(mp => mp.matchId === p.matchId);
            const placement = matchParticipants.findIndex(mp => mp.userId === user.id) + 1;

            return {
                difficulty: p.match.game.difficulty.name,
                mode: p.match.game.mode.name,
                score: p.round_eliminated,
                date: p.achieved_at.toISOString().split("T")[0],
                placement: matchParticipants.length > 1 ? placement : undefined
            };
        });

        return scores;
    }

    async getSinglePlayerStats(userId: number): Promise<number> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");

        const totalGames = await this.getTotalGamesPlayed(userId);
        return totalGames;
    }
}
