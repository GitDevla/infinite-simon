import { IGameService } from "../../interfaces/services/IGameService";
import { IGameRepository, Game, Match } from "../../interfaces/repositories/IGameRepository";
import { ParticipantStatus } from "../../interfaces/repositories/IGameRepository";

export class GameService implements IGameService {
    constructor(private readonly gameRepository: IGameRepository) {}

    async startNewGame(modeId: number, difficultyId: number): Promise<{ game: Game; match: Match }> {
        const game = await this.gameRepository.createGame(modeId, difficultyId);
        const seed = Math.floor(Math.random() * 1000000);
        
        const match = await this.gameRepository.createMatch({
            gameId: game.id,
            seed,
        });

        return { game, match };
    }

    async joinMultiplayerMatch(userId: number, matchId: number): Promise<{ game: Game; match: Match }> {
        const match = await this.gameRepository.getMatchById(matchId);

        if (!match) {
            throw new Error("Match not found");
        }

        const game = await this.gameRepository.getGameById(match.gameId);

        if (!game) {
            throw new Error("Game not found");
        }

        await this.gameRepository.upsertGameResult({
            userId,
            matchId,
            roundEliminated: 0,
            status: ParticipantStatus.waiting,
        });

        return { game, match };
    }

    async saveGameResult(userId: number, matchId: number, roundEliminated: number, status: ParticipantStatus): Promise<void> {
        await this.gameRepository.upsertGameResult({
            userId,
            matchId,
            roundEliminated,
            status,
        });
    }
}
