import type { Request, Response, NextFunction } from "express";
import { IAuthService } from "../../interfaces/services/IUserService";
import { MissingParameterError } from "../errors/ClientError";

export class AuthController {
    constructor(private readonly authService: IAuthService) {}

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, password } = req.body;
            if (!username) throw new MissingParameterError("username");
            if (!password) throw new MissingParameterError("password");
            const token = await this.authService.login(username, password);
            res.json({ token });
        } catch (error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, password, email } = req.body;

            if (!username) throw new MissingParameterError("username");
            if (!password) throw new MissingParameterError("password");
            if (!email) throw new MissingParameterError("email");

            await this.authService.register(username, email, password);
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }

    async requestPasswordReset(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;
            if (!email) throw new MissingParameterError("email");

            await this.authService.initiatePasswordReset(email);
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }

    async finalizePasswordReset(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { token, newPassword } = req.body;
            if (!token) throw new MissingParameterError("token");
            if (!newPassword) throw new MissingParameterError("newPassword");

            await this.authService.finalizePasswordReset(token, newPassword);
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }

    async finalizeEmailVerification(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { token } = req.body;
            if (!token) throw new MissingParameterError("token");

            await this.authService.finalizeEmailVerification(token);
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }

    async resendVerificationEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = (req as any).userId;
            if (!userId) throw new MissingParameterError("userId");

            await this.authService.initiateEmailVerification(userId);
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }
}
