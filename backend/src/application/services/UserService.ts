import { IUserService, UserStatsExtended } from "../../interfaces/services/IUserService";
import { IUserRepository, User, UserStats, UserScoresQuery } from "../../interfaces/repositories/IUserRepository";
import { IPasswordHasher } from "../../interfaces/services/IServices";

export class UserService implements IUserService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher
    ) {}

    async updateLastLogin(username: string): Promise<void> {
        await this.userRepository.updateLastLogin(username, new Date());
    }

    async changePassword(username: string, newPassword: string): Promise<void> {
        const user = await this.userRepository.findByUsername(username);
        if (!user) {
            throw new Error("User not found");
        }

        const passwordHash = await this.passwordHasher.hash(newPassword);
        await this.userRepository.update(username, { password_hash: passwordHash });
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return this.userRepository.findByUsername(username);
    }

    async getUserStats(username: string): Promise<UserStats> {
        const totalGames = await this.userRepository.getTotalGamesPlayed(username);
        const bestScore = await this.userRepository.getBestScore(username);
        const averageScore = await this.userRepository.getAverageScore(username);
        const multiplayerGames = await this.userRepository.getMultiPlayerStats(username);

        return {
            totalGames,
            bestScore,
            averageScore,
            multiplayerGames,
        };
    }

    async getUserStatsExtended(username: string, scoresQuery?: Partial<UserScoresQuery>): Promise<UserStatsExtended> {
        const totalGames = await this.userRepository.getTotalGamesPlayed(username);
        const bestScore = await this.userRepository.getBestScore(username);
        const averageScore = await this.userRepository.getAverageScore(username);
        const multiplayerGames = await this.userRepository.getMultiPlayerStats(username);
        const singleplayerStats = await this.userRepository.getSinglePlayerStats(username);
        
        const fullScoresQuery: UserScoresQuery = {
            username,
            mode: scoresQuery?.mode,
            diff: scoresQuery?.diff,
            limit: scoresQuery?.limit || 5,
            page: scoresQuery?.page || 1,
            orderBy: scoresQuery?.orderBy || "achieved_at"
        };
        
        const scores = await this.userRepository.getUserScoresWithFilters(fullScoresQuery);

        return {
            totalGames,
            bestScore,
            averageScore,
            multiplayerGames,
            singleplayerStats,
            scores,
        };
    }
}
