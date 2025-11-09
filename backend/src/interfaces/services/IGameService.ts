import { Game, Match, ParticipantStatus } from '../repositories/IGameRepository';

export interface IGameService {
    startNewGame(modeId: number, difficultyId: number): Promise<{ game: Game; match: Match }>;
    joinMultiplayerMatch(userId: number, matchId: number): Promise<{ game: Game; match: Match }>;
    saveGameResult(userId: number, matchId: number, roundEliminated: number, status?: ParticipantStatus): Promise<void>;
}
