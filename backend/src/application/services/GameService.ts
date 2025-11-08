import { IGameService } from "../../interfaces/services/IGameService";
import { IGameRepository, Game, Match } from "../../interfaces/repositories/IGameRepository";

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

    async saveGameResult(userId: number, matchId: number, roundEliminated: number): Promise<void> {
        await this.gameRepository.upsertGameResult({
            userId,
            matchId,
            roundEliminated,
        });
    }
}
