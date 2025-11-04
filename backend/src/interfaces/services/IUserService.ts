import { User, UserStats, UserScores, UserScoresQuery } from '../repositories/IUserRepository';

export interface IAuthService {
    login(username: string, password: string): Promise<{ success: boolean; token?: string; error?: string }>;
    register(username: string, email: string, password: string): Promise<{ success: boolean; error?: string }>;
}

export interface UserStatsExtended extends UserStats {
    singleplayerStats: number;
    scores: UserScores[];
}

export interface UserProfileUpdate {
    username?: string;
    email?: string;
    password?: string;
    currentPassword?: string;
    profilePicture?: string;
}

export interface IUserService {
    updateLastLogin(userId: number): Promise<void>;
    changePassword(userId: number, newPassword: string): Promise<void>;
    getUserByUsername(username: string): Promise<User | null>;
    getUserById(userId: number): Promise<User | null>;
    getUserStatsExtended(userId: number, scoresQuery?: Partial<UserScoresQuery>): Promise<UserStatsExtended>;
    updateUserProfile(userId: number, updates: Partial<UserProfileUpdate>): Promise<User>;
}
