import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GameQuery {
    static async createGame(modeId: number, difficultyId: number) {
        return prisma.game.create({
            data: {
                modeId,
                difficultyId,
            },
        });
    }

    static async getGameById(id: number) {
        return prisma.game.findUnique({
            where: { id },
        });
    }

    static async getGames() {
        return prisma.game.findMany();
    }

    static async createMatch({ gameId, seed, startedAt }: {
        gameId: number;
        seed: number;
        startedAt?: Date;
    }) {
        return prisma.match.create({
            data: {
                gameId,
                seed,
                startedAt: startedAt || new Date(),
            },
        });
    }

    static async createGameResult({ username, matchId, roundEliminated }: {
        username: string;
        matchId: number;
        roundEliminated: number;
    }) {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) throw new Error("User not found");
        return prisma.participant.create({
            data: {
                userId: user.id,
                matchId,
                round_eliminated: roundEliminated,
            },
        });
    }

    static async deleteMatchAndGameAndParticipant(matchId: number) {
        const match = await prisma.match.findUnique({ where: { id: matchId } });
        if (!match) throw new Error("Match not found");
        await prisma.participant.deleteMany({ where: { matchId } });
        await prisma.match.delete({ where: { id: matchId } });
        await prisma.game.delete({ where: { id: match.gameId } });
    }

    static async getUsersAndPlacementsForMatch(matchId: number) {
        // Get all participants for the match, ordered by round_eliminated descending
        const participants = await prisma.participant.findMany({
            where: { matchId },
            orderBy: { round_eliminated: "desc" },
            include: { user: true },
        });
        // Map to username and placement
        return participants.map((p, idx) => ({
            username: p.user.username,
            round_eliminated: p.round_eliminated,
            placement: idx + 1,
        }));
    }

    static async getUserScores({
        username,
        mode,
        diff,
        limit = 5,
        page = 1,
        orderBy = "achieved_at"
    }: {
        username: string;
        mode?: string;
        diff?: string;
        limit?: number;
        page?: number;
        orderBy?: string;
    }) {
        const user = await prisma.user.findUnique({ where: { username } });
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
        const participants = await prisma.participant.findMany({
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
            const matchParticipants = await prisma.participant.findMany({
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
}

