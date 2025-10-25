import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GameService {
    static async startNewGame(modeId: number, difficultyId: number) {
        const game = await prisma.game.create({
            data: {
                modeId,
                difficultyId,
            },
        });
        return {
            id: game.id,
            seed: Math.floor(Math.random() * 1000000),
        };
    }
}