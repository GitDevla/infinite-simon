import { IUserService, UserProfileUpdate, UserStatsExtended } from "../../interfaces/services/IUserService";
import { IUserRepository, User, UserScoresQuery } from "../../interfaces/repositories/IUserRepository";
import { IPasswordHasher, IValidator } from "../../interfaces/services/IServices";
import { IImageRepository } from "../../interfaces/repositories/IImageRepository";
import { InvalidParameterError, NotFoundError, UnauthorizedError } from "../../presentation/errors/ClientError";

export class UserService implements IUserService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly profilePictureRepository: IImageRepository,
        private readonly credentialValidator: IValidator
    ) {}

    async updateLastLogin(userId: number): Promise<void> {
        await this.userRepository.updateLastLogin(userId, new Date());
    }

    async changePassword(userId: number, newPassword: string): Promise<void> {
        const user = await this.userRepository.getUserById(userId);
        if (!user) throw new NotFoundError("User not found");

        const passwordHash = await this.passwordHasher.hash(newPassword);
        await this.userRepository.update(userId, { password_hash: passwordHash });
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return this.userRepository.getUserByUsername(username);
    }

    async getUserById(userId: number): Promise<User | null> {
        return this.userRepository.getUserById(userId);
    }

    async getUserStatsExtended(userId: number, scoresQuery?: Partial<UserScoresQuery>): Promise<UserStatsExtended> {
        const [totalGames, bestScore, averageScore, multiplayerGames, singleplayerStats] = await Promise.all([
            this.userRepository.getTotalGamesPlayed(userId),
            this.userRepository.getBestScore(userId),
            this.userRepository.getAverageScore(userId),
            this.userRepository.getMultiPlayerStats(userId),
            this.userRepository.getSinglePlayerStats(userId)
        ]);

        const fullScoresQuery: UserScoresQuery = {
            userId,
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

    async updateUserProfile(userId: number, updates: Partial<UserProfileUpdate>): Promise<User> {
        const user = await this.userRepository.getUserById(userId);
        if (user === null) throw new NotFoundError("User");

        const updateData: Partial<User> = {};

        if (updates.username) {
            this.credentialValidator.validateUsername(updates.username);
            const existingUser = await this.userRepository.getUserByUsername(updates.username);
            if (existingUser) throw new InvalidParameterError("Username is already taken");
            updateData.username = updates.username;
        }
        if (updates.email) {
            this.credentialValidator.validateEmail(updates.email);
            const existingEmail = await this.userRepository.getUserByEmail(updates.email);
            if (existingEmail) throw new InvalidParameterError("Email is already taken");
            updateData.email = updates.email;
        }
        if (updates.profilePicture) {
            if (user.avatar_uri) {
                await this.profilePictureRepository.delete(user.avatar_uri);
            }
        
            const profilePictureUri = await this.profilePictureRepository.save(
                updates.profilePicture,
                `user_${userId}_profile_picture`,
            );
            updateData.avatar_uri = profilePictureUri;
        }
        if (updates.password) {
            this.credentialValidator.validatePassword(updates.password);

            const currentPasswordHash = user.password_hash;

            const isCurrentPasswordValid = await this.passwordHasher.compare(updates.currentPassword || "", currentPasswordHash);
            if (!isCurrentPasswordValid) throw new UnauthorizedError("Current password is incorrect");

            await this.changePassword(userId, updates.password);
        }

        return this.userRepository.update(userId, updateData);
    }
}
