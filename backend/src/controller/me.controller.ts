import {Request, Response} from "express";
import {UserQuery} from "../model/user.query";
import {GameQuery} from "../model/game.query";

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
			avatar: user.avatar_uri || null
		});
	} catch (err) {
		res.status(500).json({error: "Internal server error"});
	}
}

export async function mystats(req: Request, res: Response) {
	try {
		const username = (req as any).username;
		if (!username) return res.status(401).json({error: "Unauthorized"});

		const user = await UserQuery.getUserByUsername(username);
		if (!user) return res.status(404).json({error: "User not found"});

		// Extract query parameters
		const { mode, diff, limit, page, orderBy } = req.query;

		// TODO: parallelize the following calls
		res.json({
			total_games: await UserQuery.getTotalGamesPlayed(username),
			best_score: await UserQuery.getBestScore(username),
			average_score: await UserQuery.getAverageScore(username),
			singleplayer_stats: await UserQuery.getSinglePlayerStats(username),
			multiplayer_stats: await UserQuery.getMultiPlayerStats(username),
			scores: await GameQuery.getUserScores({
				username,
				mode: typeof mode === "string" ? mode : undefined,
				diff: typeof diff === "string" ? diff : undefined,
				limit: limit !== undefined ? Number(limit) : undefined,
				page: page !== undefined ? Number(page) : undefined,
				orderBy: typeof orderBy === "string" ? orderBy : "achieved_at"
			})
		});
	} catch (err) {
		console.error("mystats error:", err);
		res.status(500).json({error: "Internal server error"});
	}
}
