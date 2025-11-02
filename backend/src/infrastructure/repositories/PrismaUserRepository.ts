import { PrismaClient } from "@prisma/client";
import { IUserRepository, User, UserPlacement, UserScores, UserScoresQuery } from "../../interfaces/repositories/IUserRepository";

export class PrismaUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findByUsername(username: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { username },
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

    async update(username: string, data: Partial<User>): Promise<User> {
        return this.prisma.user.update({
            where: { username },
            data,
        });
    }

    async delete(username: string): Promise<void> {
        await this.prisma.user.delete({
            where: { username },
        });
    }

    async updateLastLogin(username: string, date: Date): Promise<User> {
        return this.prisma.user.update({
            where: { username },
            data: { last_login: date },
        });
    }

    async getUserScores(username: string): Promise<any[]> {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (!user) throw new Error("User not found");
        
        return this.prisma.participant.findMany({
            where: { userId: user.id },
            orderBy: { achieved_at: "desc" },
        });
    }

    async getUserPlacementInMatch(username: string, matchId: number): Promise<UserPlacement> {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (!user) throw new Error("User not found");
        
        const participants = await this.prisma.participant.findMany({
            where: { matchId },
            orderBy: { round_eliminated: "desc" },
        });
        
        const placement = participants.findIndex(p => p.userId === user.id) + 1;
        return { placement, total: participants.length };
    }

    async getTotalGamesPlayed(username: string): Promise<number> {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (!user) throw new Error("User not found");
        
        return this.prisma.participant.count({
            where: { userId: user.id },
        });
    }

    async getBestScore(username: string): Promise<number | null> {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (!user) throw new Error("User not found");
        
        const bestParticipant = await this.prisma.participant.findFirst({
            where: { userId: user.id },
            orderBy: { round_eliminated: "desc" },
        });
        
        return bestParticipant ? bestParticipant.round_eliminated : null;
    }

    async getAverageScore(username: string): Promise<number | null> {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (!user) throw new Error("User not found");
        
        const participants = await this.prisma.participant.findMany({
            where: { userId: user.id },
        });
        
        if (participants.length === 0) return null;
        
        const totalScore = participants.reduce((sum, p) => sum + p.round_eliminated, 0);
        return totalScore / participants.length;
    }

    async getMultiPlayerStats(username: string): Promise<number> {
        const user = await this.prisma.user.findUnique({ where: { username } });
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
        const { username, mode, diff, limit = 5, page = 1, orderBy = "achieved_at" } = query;
        
        const user = await this.prisma.user.findUnique({ where: { username } });
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

        // Calculate placement
        const scores = await Promise.all(participants.map(async p => {
            // Get all participants
            const matchParticipants = await this.prisma.participant.findMany({
                where: { matchId: p.matchId },
                orderBy: { round_eliminated: "desc" }
            });
            const placement = matchParticipants.findIndex(mp => mp.userId === user.id) + 1;

            return {
                difficulty: p.match.game.difficulty.name,
                mode: p.match.game.mode.name,
                score: p.round_eliminated,
                date: p.achieved_at.toISOString().split("T")[0],
                placement: matchParticipants.length > 1 ? placement : undefined
            };
        }));

        return scores;
    }

    async getSinglePlayerStats(username: string): Promise<number> {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (!user) throw new Error("User not found");
        
        const totalGames = await this.getTotalGamesPlayed(username);
        return totalGames;
    }
}
