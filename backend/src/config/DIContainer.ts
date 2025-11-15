import { PrismaClient } from "@prisma/client";

// Infrastructure
import { ProfilePictureRepository } from "../infrastructure/repositories/ProfilePictureRepository";
import { PrismaUserRepository } from "../infrastructure/repositories/PrismaUserRepository";
import { PrismaGameRepository } from "../infrastructure/repositories/PrismaGameRepository";
import { BcryptPasswordHasher } from "../infrastructure/security/BcryptPasswordHasher";
import { JwtTokenGenerator } from "../infrastructure/security/JwtTokenGenerator";
import { CredentialValidator } from "../infrastructure/validation/CredentialValidator";

// Services
import { AuthService } from "../application/services/AuthService";
import { UserService } from "../application/services/UserService";
import { GameService } from "../application/services/GameService";

// Interfaces
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { IGameRepository } from "../interfaces/repositories/IGameRepository";
import { IImageRepository } from "../interfaces/repositories/IImageRepository";
import { IPasswordHasher, ITokenGenerator, IValidator } from "../interfaces/services/IServices";
import { IAuthService, IUserService } from "../interfaces/services/IUserService";
import { IGameService } from "../interfaces/services/IGameService";
import { IEmailService } from "../interfaces/services/IEmailService";
import { ResendEmailService } from "../infrastructure/validation/Resend";

export class DIContainer {
    private readonly prisma: PrismaClient;
    
    // Repositories
    private readonly userRepository: IUserRepository;
    private readonly gameRepository: IGameRepository;
    private readonly imageRepository: IImageRepository;
    
    // Infrastructure services
    private readonly passwordHasher: IPasswordHasher;
    private readonly tokenGenerator: ITokenGenerator;
    private readonly validator: IValidator;
    private readonly emailService: IEmailService;
    
    // Application services
    private readonly authService: IAuthService;
    private readonly userService: IUserService;
    private readonly gameService: IGameService;

    constructor() {
        // Infrastructure
        this.prisma = new PrismaClient();
        this.passwordHasher = new BcryptPasswordHasher();
        this.tokenGenerator = new JwtTokenGenerator();
        this.validator = new CredentialValidator();
        this.emailService = new ResendEmailService(process.env.RESEND_API_KEY || "");
        
        // Repositories
        this.userRepository = new PrismaUserRepository(this.prisma);
        this.gameRepository = new PrismaGameRepository(this.prisma);
        this.imageRepository = new ProfilePictureRepository("public/profile_pictures");
        
        // Application Services
        this.authService = new AuthService(
            this.userRepository,
            this.passwordHasher,
            this.tokenGenerator,
            this.validator,
            this.emailService
        );
        
        this.userService = new UserService(
            this.userRepository,
            this.passwordHasher,
            this.imageRepository,
            this.validator
        );
        
        this.gameService = new GameService(this.gameRepository);
    }

    // Getters for accessing services
    getAuthService(): IAuthService {
        return this.authService;
    }

    getUserService(): IUserService {
        return this.userService;
    }

    getGameService(): IGameService {
        return this.gameService;
    }

    getTokenGenerator(): ITokenGenerator {
        return this.tokenGenerator;
    }

    getFileRepository(): IImageRepository {
        return this.imageRepository;
    }

    // Clean up resources
    async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
    }
}
