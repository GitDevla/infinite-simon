import type { Request, Response } from "express";
import { IGameService } from "../../interfaces/services/IGameService";

export class GameController {
    constructor(private readonly gameService: IGameService) {}

    async startNewGame(req: Request, res: Response): Promise<void> {
        try {
            const { modeId, difficultyId } = req.body;
            
            if (!modeId || !difficultyId) {
                res.status(400).json({ success: false, error: "Mode ID and Difficulty ID are required" });
                return;
            }

            const result = await this.gameService.startNewGame(modeId, difficultyId);
            
            res.json({ 
                success: true, 
                game: result.game, 
                match: { id: result.match.id, seed: result.match.seed } 
            });
        } catch (error) {
            res.status(400).json({ success: false, error: (error as Error).message });
        }
    }

    async saveGameResult(req: Request, res: Response): Promise<void> {
        try {
            const { matchId, roundEliminated, status } = req.body;
            const userId = (req as any).userId;

            if (!userId || !matchId || roundEliminated === undefined) {
                res.status(400).json({ success: false, error: "User ID, match ID, and round eliminated are required" });
                return;
            }

            await this.gameService.saveGameResult(userId, matchId, roundEliminated, status);

            res.json({ success: true });
        } catch (error) {
            res.status(400).json({ success: false, error: (error as Error).message });
        }
    }

    async joinMultiplayerMatch(req: Request, res: Response): Promise<void> {
        try {
            const { matchId } = req.body;
            const userId = (req as any).userId;

            if (!userId || !matchId) {
                res.status(400).json({ success: false, error: "User ID and Match ID are required" });
                return;
            }

            const result = await this.gameService.joinMultiplayerMatch(userId, matchId);

            res.json({ 
                success: true, 
                game: result.game, 
                match: { id: result.match.id, seed: result.match.seed },
            });
        } catch (error) {
            res.status(400).json({ success: false, error: (error as Error).message });
        }
    }
}
