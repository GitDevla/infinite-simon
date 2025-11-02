import type { Request, Response } from "express";
import { IUserService } from "../../interfaces/services/IUserService";

export class UserController {
    constructor(private readonly userService: IUserService) {}

    async getMe(req: Request, res: Response): Promise<void> {
        try {
            const username = (req as any).username;
            
            if (!username) {
                res.status(401).json({ error: "Authentication required" });
                return;
            }

            const user = await this.userService.getUserByUsername(username);
            
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
            const username = (req as any).username;
            
            if (!username) {
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

            const stats = await this.userService.getUserStatsExtended(username, scoresQuery);
            
            res.json(stats);
        } catch (error) {
            console.error("getStats error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
