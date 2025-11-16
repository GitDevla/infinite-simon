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
    status: ParticipantStatus;
}

export interface MatchParticipant {
    user: {
        username: string;
        avatar_uri: string | null;
    };
    status: ParticipantStatus;
    round_eliminated: number | null;
}

export enum ParticipantStatus {
  waiting = "waiting",
  playing = "playing",
  finished = "finished",
}

export interface IGameRepository {
    createGame(modeId: number, difficultyId: number): Promise<Game>;
    createMatch(data: { gameId: number; seed: number; startedAt?: Date }): Promise<Match>;
    upsertGameResult(data: GameResult): Promise<GameResult>;
    getMatchById(matchId: number): Promise<Match | null>;
    getGameById(gameId: number): Promise<Game | null>;
    getParticipantsByMatchId(matchId: number): Promise<MatchParticipant[]>;
    getMatchStatus(matchId: number): Promise<{ status: ParticipantStatus }>;
}
