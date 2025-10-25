import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveMatch({ gameId, seed, startedAt, endedAt }: {
    gameId: number;
    seed: number;
    startedAt?: Date;
    endedAt?: Date;
}) {
    return prisma.match.create({
        data: {
            gameId,
            seed,
            startedAt: startedAt || new Date(),
            endedAt,
        },
    });
}
// TODO: consider merging with gameResult.service.ts
// TODO: add tests
// TODO: implement updateMatchEndTime
export async function updateMatchEndTime(matchId: number, endTime: Date = new Date()) {
    return prisma.match.update({
        where: { id: matchId },
        data: { endedAt: endTime },
    });
}
