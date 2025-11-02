import type { Request, Response } from "express";
import { IAuthService } from "../../interfaces/services/IUserService";

export class AuthController {
    constructor(private readonly authService: IAuthService) {}

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            
            if (!username || !password) {
                res.status(400).json({ success: false, error: "Username and password are required" });
                return;
            }

            const result = await this.authService.login(username, password);
            
            if (result.success) {
                res.json({ success: true, token: result.token });
            } else {
                res.status(401).json({ success: false, error: result.error });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, password, email } = req.body;
            
            if (!username || !password || !email) {
                res.status(400).json({ success: false, error: "Username, password, and email are required" });
                return;
            }

            const result = await this.authService.register(username, email, password);
            
            if (result.success) {
                res.json({ success: true });
            } else {
                res.status(400).json({ success: false, error: result.error });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    }
}
