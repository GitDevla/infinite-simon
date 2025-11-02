import { IAuthService } from "../../interfaces/services/IUserService";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { IPasswordHasher, ITokenGenerator, IValidator } from "../../interfaces/services/IServices";

export class AuthService implements IAuthService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly tokenGenerator: ITokenGenerator,
        private readonly validator: IValidator
    ) {}

    async login(username: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
        try {
            const user = await this.userRepository.getUserByUsername(username);
            if (!user) {
                console.log("User not found");
                return { success: false, error: "Invalid credentials" };
            }

            const passwordMatch = await this.passwordHasher.compare(password, user.password_hash);
            if (!passwordMatch) {
                console.log("Invalid password");
                return { success: false, error: "Invalid credentials" };
            }

            await this.userRepository.updateLastLogin(user.id, new Date());
            const token = this.tokenGenerator.generate({ userId: user.id });

            return { success: true, token };
        } catch (error) {
            return { success: false, error: (error as Error).message };
        }
    }

    async register(username: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
        try {
            const validationResult = this.validator.validateCredentials(username, password, email);
            if (!validationResult.isValid) {
                return { success: false, error: validationResult.errorMessage };
            }

            const existingUser = await this.userRepository.getUserByUsername(username);
            if (existingUser) {
                return { success: false, error: "Username already exists" };
            }

            const passwordHash = await this.passwordHasher.hash(password);
            await this.userRepository.create(username, email, passwordHash);

            return { success: true };
        } catch (error) {
            return { success: false, error: (error as Error).message };
        }
    }
}
