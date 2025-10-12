import type { Request, Response } from "express";
import { UserService } from "../service/user.service";
import jwt from "jsonwebtoken";

export async function loginController(req: Request, res: Response) {
	const { username, password } = req.body;
	
    const success = await UserService.login(username, password);
    if (success) {
        const token = jwt.sign({ username }, "your_jwt_secret", { expiresIn: "30d" }); 

        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, error: "Invalid credentials" });
    }
}


export async function registerController(req: Request, res: Response) {
    const { username, password,email } = req.body;
    try {
        await UserService.register(username, email, password);
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message });
    }
}