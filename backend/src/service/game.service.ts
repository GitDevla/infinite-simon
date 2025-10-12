export class GameService {
    static async startNewGame(modeId: number, difficultyId: number) {
        // TODO
        return {
            seed: Math.floor(Math.random() * 1000000),
        };
    }
}