import { Request, Response, NextFunction } from "express";
import { ITokenGenerator } from "../../interfaces/services/IServices";
import { MissingParameterError, UnauthorizedError } from "../errors/ClientError";

export class AuthMiddleware {
    constructor(private readonly tokenGenerator: ITokenGenerator) {}

    authenticate = (req: Request, _res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;
        if (!authHeader) return next(new MissingParameterError("authorization header"));

        const token = authHeader.split(" ")[1]?.trim();
        if (!token) return next(new MissingParameterError("token"));

        try {
            const decoded = this.tokenGenerator.verify(token);
            (req as any).userId = decoded.userId;
            next();
        } catch (verifyError) {
            return next(new UnauthorizedError("Invalid or expired token"));
        }
    };
}
