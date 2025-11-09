import type { Request, Response, NextFunction } from "express";
import { IGameService } from "../../interfaces/services/IGameService";
import { InvalidParameterError, MissingParameterError } from "../errors/ClientError";

export class GameController {
    constructor(private readonly gameService: IGameService) {}

    async startNewGame(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { modeId, difficultyId } = req.body;

            if (!modeId) return next(new MissingParameterError("modeId"));
            if (!difficultyId) return next(new MissingParameterError("difficultyId"));

            const result = await this.gameService.startNewGame(modeId, difficultyId);

            res.json({
                success: true,
                game: result.game,
                match: { id: result.match.id, seed: result.match.seed }
            });
        } catch (error) {
            next(error);
        }
    }

    async saveGameResult(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { matchId, roundEliminated, status } = req.body;
            const userId = (req as any).userId;

            if (!userId) return next(new MissingParameterError("userId"));
            if (!matchId) return next(new MissingParameterError("matchId"));
            if (roundEliminated === undefined) return next(new MissingParameterError("roundEliminated"));

            await this.gameService.saveGameResult(userId, matchId, roundEliminated, status);

            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }

    async joinMultiplayerMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { matchId } = req.body;
            const userId = (req as any).userId;

            if (!userId) return next(new MissingParameterError("userId"));
            if (!matchId) return next(new MissingParameterError("matchId"));

            const result = await this.gameService.joinMultiplayerMatch(userId, matchId);

            res.json({ 
                success: true, 
                game: result.game, 
                match: { id: result.match.id, seed: result.match.seed },
            });
        } catch (error) {
            next(error);
        }
    }
}
