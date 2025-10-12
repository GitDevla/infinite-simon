import { GameService } from "../service/game.service";
import type { Request, Response } from "express";

export async function startNewGameController(req: Request, res: Response) {
    const { modeId, difficultyId } = req.body;
    try {
        const game = await GameService.startNewGame(modeId, difficultyId);
        res.json({ success: true, game });
    } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message });
    }
}