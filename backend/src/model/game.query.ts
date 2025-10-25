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

    static async createMatch({ gameId, seed, startedAt, endedAt }: {
        gameId: number;
        seed: number;
        startedAt?: Date;
        endedAt?: Date;
    }) {
        return prisma.match.create({
            data: {
                gameId,
                seed,
                startedAt: startedAt || new Date(),
                endedAt,
            },
        });
    }

    static async updateMatchEndTime(matchId: number, endTime: Date = new Date()) {
        return prisma.match.update({
            where: { id: matchId },
            data: { endedAt: endTime },
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
}
