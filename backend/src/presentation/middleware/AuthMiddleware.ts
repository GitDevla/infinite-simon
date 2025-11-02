import { Request, Response, NextFunction } from "express";
import { ITokenGenerator } from "../../interfaces/services/IServices";

export class AuthMiddleware {
    constructor(private readonly tokenGenerator: ITokenGenerator) {}

    authenticate = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const authHeader = req.headers.authorization;
            
            if (!authHeader) {
                res.status(401).json({ error: "No token provided" });
                return;
            }

            const token = authHeader.split(" ")[1];
            if (!token) {
                res.status(401).json({ error: "Malformed token" });
                return;
            }

            const decoded = this.tokenGenerator.verify(token);
            (req as any).username = decoded.username;
            next();
        } catch (error) {
            res.status(401).json({ error: "Invalid token" });
        }
    };
}
