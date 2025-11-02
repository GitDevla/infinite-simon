export interface User {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    avatar_uri?: string | null;
    joined_date: Date;
    last_login: Date;
}

export interface UserStats {
    totalGames: number;
    bestScore: number | null;
    averageScore: number | null;
    multiplayerGames: number;
}

export interface UserPlacement {
    placement: number;
    total: number;
}

export interface UserScores {
    difficulty: string;
    mode: string;
    score: number;
    date: string;
    placement?: number;
}

export interface UserScoresQuery {
    username: string;
    mode?: string;
    diff?: string;
    limit?: number;
    page?: number;
    orderBy?: string;
}

export interface IUserRepository {
    findByUsername(username: string): Promise<User | null>;
    create(username: string, email: string, passwordHash: string, avatarUri?: string): Promise<User>;
    update(username: string, data: Partial<User>): Promise<User>;
    delete(username: string): Promise<void>;
    updateLastLogin(username: string, date: Date): Promise<User>;
    getUserScores(username: string): Promise<any[]>;
    getUserScoresWithFilters(query: UserScoresQuery): Promise<UserScores[]>;
    getUserPlacementInMatch(username: string, matchId: number): Promise<UserPlacement>;
    getTotalGamesPlayed(username: string): Promise<number>;
    getBestScore(username: string): Promise<number | null>;
    getAverageScore(username: string): Promise<number | null>;
    getMultiPlayerStats(username: string): Promise<number>;
    getSinglePlayerStats(username: string): Promise<number>;
}
