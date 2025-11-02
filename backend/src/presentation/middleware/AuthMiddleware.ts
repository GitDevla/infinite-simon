import { Request, Response, NextFunction } from "express";
import { ITokenGenerator } from "../../interfaces/services/IServices";

export class AuthMiddleware {
    constructor(private readonly tokenGenerator: ITokenGenerator) {}

    authenticate = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const authHeader = req.headers.authorization;
            
            if (!authHeader) {
                console.log("No token provided");
                res.status(401).json({ error: "No token provided" });
                return;
            }

            const token = authHeader.split(" ")[1]?.trim();
            if (!token) {
                console.log("Malformed token");
                res.status(401).json({ error: "Malformed token" });
                return;
            }

            let decoded;
            try {
                decoded = this.tokenGenerator.verify(token);
            } catch (verifyError) {
                console.log("Token verification error:", verifyError);
                throw verifyError;
            }
            (req as any).userId = decoded.userId;
            next();
        } catch (error) {
            console.log("Auth error:", error);
            res.status(401).json({ error: "Invalid token" });
        }
    };
}
