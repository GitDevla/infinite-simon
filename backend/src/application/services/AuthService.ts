import { IAuthService } from "../../interfaces/services/IUserService";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { IPasswordHasher, ITokenGenerator, IValidator } from "../../interfaces/services/IServices";
import { InvalidParameterError, UnauthorizedError } from "../../presentation/errors/ClientError";
import { IEmailService } from "../../interfaces/services/IEmailService";

export class AuthService implements IAuthService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly tokenGenerator: ITokenGenerator,
        private readonly validator: IValidator,
        private readonly emailService: IEmailService
    ) {}

    async login(username: string, password: string): Promise<{ token: string }> {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) throw new UnauthorizedError("Invalid credentials");

        const passwordMatch = await this.passwordHasher.compare(password, user.password_hash);
        if (!passwordMatch) throw new UnauthorizedError("Invalid credentials");

        await this.userRepository.updateLastLogin(user.id, new Date());
        const token = this.tokenGenerator.generate({ userId: user.id });

        return { token };
    }

    async register(username: string, email: string, password: string): Promise<void> {
        this.validator.validateCredentials(username, password, email);

        const existingUser = await this.userRepository.getUserByUsername(username);
        if (existingUser) throw new InvalidParameterError("Username is already taken");

        const existingEmail = await this.userRepository.getUserByEmail(email);
        if (existingEmail) throw new InvalidParameterError("Email is already in use");

        const passwordHash = await this.passwordHasher.hash(password);
        const user = await this.userRepository.create(username, email, passwordHash);
        await this.initiateEmailVerification(user.id);
    }

    async initiateEmailVerification(userId: number): Promise<void> {
        const user = await this.userRepository.getUserById(userId);
        if (!user) return;

        if (user.email_verified) 
            throw new InvalidParameterError("Email is already verified");

        const email = user.email;

        const verificationToken = this.tokenGenerator.generate({ userId: user.id }, '1h');
        const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
        const verificationLink = `${FRONTEND_URL}/verify-email?token=${verificationToken}`;

        await this.emailService.sendRegistrationEmail(email, verificationLink);
    }

    async finalizeEmailVerification(token: string): Promise<void> {
        const payload = this.tokenGenerator.verify(token);
        if (!payload || !payload.userId) throw new InvalidParameterError("Invalid or expired token");

        const user = await this.userRepository.getUserById(payload.userId);
        if (!user) throw new InvalidParameterError("User not found");

        await this.userRepository.update(user.id, {
            email_verified: true
        });
    }

    async initiatePasswordReset(email: string): Promise<void> {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) return;

        const resetToken = this.tokenGenerator.generate({ userId: user.id }, '15m');
        const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
        const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;

        await this.emailService.sendPasswordResetEmail(email, resetLink);
    }

    async finalizePasswordReset(token: string, newPassword: string): Promise<void> {
        const payload = this.tokenGenerator.verify(token);
        if (!payload || !payload.userId) throw new InvalidParameterError("Invalid or expired token");

        this.validator.validatePassword(newPassword);

        const user = await this.userRepository.getUserById(payload.userId);
        if (!user) throw new InvalidParameterError("User not found");

        const newHashedPassword = await this.passwordHasher.hash(newPassword);
        await this.userRepository.update(user.id, {
            password_hash: newHashedPassword
        });
    }
}
