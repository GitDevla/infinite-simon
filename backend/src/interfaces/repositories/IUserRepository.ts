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
    userId: number;
    mode?: string;
    diff?: string;
    limit?: number;
    page?: number;
    orderBy?: string;
}

export interface IUserRepository {
    getUserByUsername(username: string): Promise<User | null>;
    getUserById(userId: number): Promise<User | null>;
    create(username: string, email: string, passwordHash: string, avatarUri?: string): Promise<User>;
    update(userId: number, data: Partial<User>): Promise<User>;
    delete(userId: number): Promise<void>;
    updateLastLogin(userId: number, date: Date): Promise<User>;
    getUserScores(userId: number): Promise<any[]>;
    getUserScoresWithFilters(query: UserScoresQuery): Promise<UserScores[]>;
    getUserPlacementInMatch(userId: number, matchId: number): Promise<UserPlacement>;
    getTotalGamesPlayed(userId: number): Promise<number>;
    getBestScore(userId: number): Promise<number | null>;
    getAverageScore(userId: number): Promise<number | null>;
    getMultiPlayerStats(userId: number): Promise<number>;
    getSinglePlayerStats(userId: number): Promise<number>;
    getUserByEmail(email: string): Promise<User | null>;
}
