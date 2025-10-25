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
}
