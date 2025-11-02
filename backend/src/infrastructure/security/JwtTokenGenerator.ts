import jwt from "jsonwebtoken";
import { ITokenGenerator } from "../../interfaces/services/IServices";

export class JwtTokenGenerator implements ITokenGenerator {
    private readonly secret: string;

    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not defined");
        }
        this.secret = process.env.JWT_SECRET;
    }

    generate(payload: any, expiresIn: string = "30d"): string {
        return jwt.sign(payload, this.secret, { expiresIn } as jwt.SignOptions);
    }

    verify(token: string): any {
        console.log("Verifying token:", token);
        return jwt.verify(token, this.secret);
    }
}
