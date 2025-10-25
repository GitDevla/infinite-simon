import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveGameResult({ username, matchId, roundEliminated }: {
    username: string;
    matchId: number;
    roundEliminated: number;
}) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) throw new Error("User not found");
    return prisma.participant.create({
        data: {
            userId: user.id,
            matchId,
            round_eliminated: roundEliminated,
        },
    });
}
