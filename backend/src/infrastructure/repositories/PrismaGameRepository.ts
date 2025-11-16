import { PrismaClient } from "@prisma/client";
import { IGameRepository, Game, Match, GameResult, MatchParticipant, ParticipantStatus } from "../../interfaces/repositories/IGameRepository";
import { NotFoundError } from "../../presentation/errors/ClientError";

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

    async getParticipantsByMatchId(matchId: number): Promise<MatchParticipant[]> {
        const participants = await this.prisma.participant.findMany({
            where: { matchId },
            include: { user: { select: { username: true, avatar_uri: true } } }
        });

        return participants.map(p => ({
            user: {
                username: p.user.username,
                avatar_uri: p.user.avatar_uri,
            },
            round_eliminated: p.round_eliminated,
            status: p.status as ParticipantStatus,
        }));
    }

    async getMatchStatus(matchId: number): Promise<{ status: ParticipantStatus }> {
        const match = await this.prisma.match.findUnique({ where: { id: matchId } });
        if (!match) {
            throw new NotFoundError("Match");
        }

        const participants = await this.prisma.participant.findMany({
            where: { matchId },
        });

        if (participants.length === 0) {
            return { status: ParticipantStatus.waiting };
        }

        if (participants.every(p => p.status === ParticipantStatus.finished)) {
            return { status: ParticipantStatus.finished };
        } else if (participants.some(p => p.status === ParticipantStatus.playing)) {
            return { status: ParticipantStatus.playing };
        } else {
            return { status: ParticipantStatus.waiting };
        }
    }
}
