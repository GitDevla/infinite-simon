import type { Request, Response, NextFunction } from "express";
import { IAuthService } from "../../interfaces/services/IUserService";
import { MissingParameterError } from "../errors/ClientError";

export class AuthController {
    constructor(private readonly authService: IAuthService) {}

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, password } = req.body;
            if (!username) return next(new MissingParameterError("username"));
            if (!password) return next(new MissingParameterError("password"));
            const token = await this.authService.login(username, password);
            res.json({ token });
        } catch (error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, password, email } = req.body;

            if (!username) return next(new MissingParameterError("username"));
            if (!password) return next(new MissingParameterError("password"));
            if (!email) return next(new MissingParameterError("email"));

            await this.authService.register(username, email, password);
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }
}
