import { GameService } from "../service/game.service";
import type { Request, Response } from "express";

export async function startNewGameController(req: Request, res: Response) {
    const { modeId, difficultyId } = req.body;
    try {
        const game = await GameService.startNewGame(modeId, difficultyId);
        const match = await GameService.saveMatch({
            gameId: game.id,
            seed: game.seed,
        });
        res.json({ success: true, game, match: { id: match.id } });
    } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message });
    }
}

export async function saveGameResultController(req: Request, res: Response) {
    const { username, matchId, roundEliminated } = req.body;
    try {
        await GameService.saveGameResult({
            username,
            matchId,
            roundEliminated,
        });
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message });
    }
}