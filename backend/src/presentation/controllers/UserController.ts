import type { Request, Response, NextFunction } from "express";
import { IUserService } from "../../interfaces/services/IUserService";
import { InvalidParameterError, MissingParameterError, NotFoundError } from "../errors/ClientError";

export class UserController {
    constructor(private readonly userService: IUserService) {}

    async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = (req as any).userId;
            if (!userId) return next(new MissingParameterError("userId"));

            const user = await this.userService.getUserById(userId);
            if (!user) return next(new NotFoundError("user"));

            // Don't return sensitive information
            const { password_hash, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } catch (error) {
            next(error);
        }
    }

    async getStats(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = (req as any).userId;
            if (!userId) return next(new MissingParameterError("userId"));

            // Extract query parameters
            const { mode, diff, limit, page, orderBy } = req.query;
            
            const scoresQuery = {
                mode: typeof mode === "string" ? mode : undefined,
                diff: typeof diff === "string" ? diff : undefined,
                limit: limit !== undefined ? Number(limit) : undefined,
                page: page !== undefined ? Number(page) : undefined,
                orderBy: typeof orderBy === "string" ? orderBy : "achieved_at"
            };

            const stats = await this.userService.getUserStatsExtended(userId, scoresQuery);

            res.json(stats);
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = (req as any).userId;
            if (!userId) return next(new MissingParameterError("userId"));

            const { username = null, email = null, profilePicture = null, password = null, currentPassword = null } = req.body ?? {};

            // Validate input
            if (username && typeof username !== "string")
                return next(new InvalidParameterError("username"));
            if (email && typeof email !== "string")
                return next(new InvalidParameterError("email"));
            if (profilePicture && typeof profilePicture !== "string")
                return next(new InvalidParameterError("profilePicture"));
            if (password && typeof password !== "string") {
                if (!currentPassword || typeof currentPassword !== "string") {
                    return next(new MissingParameterError("currentPassword"));
                }
                return next(new InvalidParameterError("password"));
            }

            const updatedUser = await this.userService.updateUserProfile(userId, { username, email, profilePicture, password, currentPassword });
            if (!updatedUser) {
                return next(new NotFoundError("user"));
            }
            
            const { password_hash, ...userWithoutPassword } = updatedUser;
            res.json(userWithoutPassword);
        } catch (error) {
            console.error("updateProfile error:", error);
            next(error);
        }
    }
}
