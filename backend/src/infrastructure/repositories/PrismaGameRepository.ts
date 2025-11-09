import { PrismaClient } from "@prisma/client";
import { IGameRepository, Game, Match, GameResult } from "../../interfaces/repositories/IGameRepository";
import { ParticipantStatus } from "../../interfaces/repositories/IGameRepository";

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

    async upsertGameResult(data: GameResult): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { id: data.userId },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const existingParticipant = await this.prisma.participant.findFirst({
            where: {
                matchId: data.matchId,
                userId: data.userId,
            },
        });

        if (existingParticipant) {
            return this.prisma.participant.update({
                where: { id: existingParticipant.id },
                data: {
                    round_eliminated: data.roundEliminated,
                    achieved_at: new Date(),
                    status: data.status,
                },
            });
        } else {
            return this.prisma.participant.create({
                data: {
                    matchId: data.matchId,
                    userId: user.id,
                    round_eliminated: data.roundEliminated,
                    status: data.status,
                },
            });
        }
    }

    async getMatchById(matchId: number): Promise<Match | null> {
        return this.prisma.match.findUnique({
            where: { id: matchId },
        });
    }

    async getGameById(gameId: number): Promise<Game | null> {
        return this.prisma.game.findUnique({
            where: { id: gameId },
        });
    }
}
