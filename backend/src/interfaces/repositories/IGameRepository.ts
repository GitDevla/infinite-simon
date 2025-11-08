export interface Game {
    id: number;
    modeId: number;
    difficultyId: number;
}

export interface Match {
    id: number;
    gameId: number;
    seed: number;
    startedAt: Date;
}

export interface GameResult {
    userId: number;
    matchId: number;
    roundEliminated: number;
}

export interface IGameRepository {
    createGame(modeId: number, difficultyId: number): Promise<Game>;
    createMatch(data: { gameId: number; seed: number; startedAt?: Date }): Promise<Match>;
    upsertGameResult(data: GameResult): Promise<any>;
    getMatchById(matchId: number): Promise<Match | null>;
    getGameById(gameId: number): Promise<Game | null>;
}
