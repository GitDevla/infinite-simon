import type { Request, Response } from "express";
import { IUserService } from "../../interfaces/services/IUserService";

export class UserController {
    constructor(private readonly userService: IUserService) {}

    async getMe(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).userId;

            if (!userId) {
                res.status(401).json({ error: "Authentication required" });
                return;
            }

            const user = await this.userService.getUserById(userId);

            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            // Don't return sensitive information
            const { password_hash, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getStats(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).userId;

            if (!userId) {
                res.status(401).json({ error: "Authentication required" });
                return;
            }

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
            console.error("getStats error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async updateProfile(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).userId;

            if (!userId) {
                res.status(401).json({ error: "Authentication required" });
                return;
            }

            const { username = null, email = null, profilePicture = null, password = null } = req.body ?? {};

            // Validate input
            if (username && typeof username !== "string") {
                res.status(400).json({ error: "Invalid username" });
                return;
            }
            if (email && typeof email !== "string") {
                res.status(400).json({ error: "Invalid email" });
                return;
            }
            if (profilePicture && typeof profilePicture !== "string") {
                res.status(400).json({ error: "Invalid profile picture URL" });
                return;
            }
            if (password && typeof password !== "string") {
                res.status(400).json({ error: "Invalid password" });
                return;
            }

            const updatedUser = await this.userService.updateUserProfile(userId, { username, email,profilePicture,password });

            if (!updatedUser) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error("updateProfile error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
