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
    username: string;
    matchId: number;
    roundEliminated: number;
}

export interface IGameRepository {
    createGame(modeId: number, difficultyId: number): Promise<Game>;
    createMatch(data: { gameId: number; seed: number; startedAt?: Date }): Promise<Match>;
    createGameResult(data: GameResult): Promise<any>;
}
