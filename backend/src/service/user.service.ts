import { UserQuery } from "../model/user.query";
import bcrypt from "bcrypt";

export class UserService {
	static async login(username: string, password: string) {
        const user = await UserQuery.getUserByUsername(username);
        if (!user) {
            return false;
        }
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        return passwordMatch;
    }
    

    static async register(username: string, email: string, password: string) {
        const existingUser = await UserQuery.getUserByUsername(username);
        if (existingUser) {
            throw new Error("Username already exists");
        }
        const passwordHash = await bcrypt.hash(password, 10);
        await UserQuery.createUser(username, email, passwordHash);
    }

    static async updateLastLogin(username: string) {
        await UserQuery.updateUserLastLogin(username, new Date());
    }
}
