import { IAuthService } from "../../interfaces/services/IUserService";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { IPasswordHasher, ITokenGenerator, IValidator } from "../../interfaces/services/IServices";
import { InvalidParameterError, UnauthorizedError } from "../../presentation/errors/ClientError";

export class AuthService implements IAuthService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly tokenGenerator: ITokenGenerator,
        private readonly validator: IValidator
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
        if (existingUser) throw new InvalidParameterError("username already taken");

        await this.userRepository.getUserByEmail(email).then(user => {
            if (user) throw new InvalidParameterError("Email is already in use");
        });

        const passwordHash = await this.passwordHasher.hash(password);
        await this.userRepository.create(username, email, passwordHash);
    }
}
