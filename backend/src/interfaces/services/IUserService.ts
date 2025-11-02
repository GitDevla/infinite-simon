import { User, UserStats, UserScores, UserScoresQuery } from '../repositories/IUserRepository';

export interface IAuthService {
    login(username: string, password: string): Promise<{ success: boolean; token?: string; error?: string }>;
    register(username: string, email: string, password: string): Promise<{ success: boolean; error?: string }>;
}

export interface UserStatsExtended extends UserStats {
    singleplayerStats: number;
    scores: UserScores[];
}

export interface IUserService {
    updateLastLogin(username: string): Promise<void>;
    changePassword(username: string, newPassword: string): Promise<void>;
    getUserByUsername(username: string): Promise<User | null>;
    getUserStats(username: string): Promise<UserStats>;
    getUserStatsExtended(username: string, scoresQuery?: Partial<UserScoresQuery>): Promise<UserStatsExtended>;
}
