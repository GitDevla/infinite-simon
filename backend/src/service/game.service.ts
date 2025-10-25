import { GameQuery } from '../model/game.query';

export class GameService {
    static async startNewGame(modeId: number, difficultyId: number) {
        const game = await GameQuery.createGame(modeId, difficultyId);
        return {
            id: game.id,
            seed: Math.floor(Math.random() * 1000000),
        };
    }

    static async saveMatch({ gameId, seed, startedAt }: {
        gameId: number;
        seed: number;
        startedAt?: Date;
    }) {
        return GameQuery.createMatch({ gameId, seed, startedAt });
    }

    static async saveGameResult({ username, matchId, roundEliminated }: {
        username: string;
        matchId: number;
        roundEliminated: number;
    }) {
        return GameQuery.createGameResult({ username, matchId, roundEliminated });
    }
}