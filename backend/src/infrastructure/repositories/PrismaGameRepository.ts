import { PrismaClient } from "@prisma/client";
import { IGameRepository, Game, Match, GameResult } from "../../interfaces/repositories/IGameRepository";

export class PrismaGameRepository implements IGameRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async createGame(modeId: number, difficultyId: number): Promise<Game> {
        return this.prisma.game.create({
            data: { modeId, difficultyId },
        });
    }

    async createMatch(data: { gameId: number; seed: number; startedAt?: Date }): Promise<Match> {
        return this.prisma.match.create({
            data: {
                gameId: data.gameId,
                seed: data.seed,
                startedAt: data.startedAt || new Date(),
            },
        });
    }

    async createGameResult(data: GameResult): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { username: data.username },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return this.prisma.participant.create({
            data: {
                matchId: data.matchId,
                userId: user.id,
                round_eliminated: data.roundEliminated,
            },
        });
    }
}
