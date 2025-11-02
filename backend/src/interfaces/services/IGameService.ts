import { Game, Match } from '../repositories/IGameRepository';

export interface IGameService {
    startNewGame(modeId: number, difficultyId: number): Promise<{ game: Game; match: Match }>;
    saveGameResult(userId: number, matchId: number, roundEliminated: number): Promise<void>;
}
