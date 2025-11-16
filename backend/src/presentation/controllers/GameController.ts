import type { Request, Response, NextFunction } from "express";
import { IGameService } from "../../interfaces/services/IGameService";
import { InvalidParameterError, MissingParameterError } from "../errors/ClientError";

export class GameController {
    constructor(private readonly gameService: IGameService) {}

    async startNewGame(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { modeId, difficultyId } = req.body;

            if (!modeId) throw new MissingParameterError("modeId");
            if (!difficultyId) throw new MissingParameterError("difficultyId");

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

            if (!userId) throw new MissingParameterError("userId");
            if (!matchId) throw new MissingParameterError("matchId");
            if (roundEliminated === undefined) throw new MissingParameterError("roundEliminated");
            if (!status) throw new MissingParameterError("status");

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

            if (!userId) throw new MissingParameterError("userId");
            if (!matchId) throw new MissingParameterError("matchId");

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

    async getMatchParticipants(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const matchId = parseInt(req.params.matchId, 10);

            if (isNaN(matchId)) throw new InvalidParameterError("matchId must be a valid number");

            const participants = await this.gameService.getMatchParticipants(matchId);

            res.json({ 
                success: true, 
                participants
            });
        } catch (error) {
            next(error);
        }
    }

    async getMatchStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const matchId = parseInt(req.params.matchId, 10);

            if (isNaN(matchId)) throw new InvalidParameterError("matchId must be a valid number");

            const status = await this.gameService.getMatchStatus(matchId);

            res.json({ 
                success: true, 
                status
            });
        } catch (error) {
            next(error);
        }
    }
}
