import {Request, Response} from "express";
import {UserQuery} from "../model/user.query";

export async function getMe(req: Request, res: Response) {
	try {
        console.log("getMe called");
		const username = (req as any).username;
        console.log("Retrieved username from request body:", username);
		if (!username) return res.status(401).json({error: "Unauthorized"});

		const user = await UserQuery.getUserByUsername(username);
		if (!user) return res.status(404).json({error: "User not found"});

		res.json({
			email: user.email,
			username: user.username,
			avatar: user.avatar || null
		});
	} catch (err) {
		res.status(500).json({error: "Internal server error"});
	}
}
