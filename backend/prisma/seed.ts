import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
    const modes = [
        { id: 1, name: 'Singleplayer'},
        { id: 2, name: 'Multiplayer'},
    ];

    for (const mode of modes) {
        await prisma.mode.upsert({
            where: { id: mode.id },
            update: {},
            create: mode,
        });
    }

    const difficulties = [
        { id: 1, name: 'Classic'},
        { id: 2, name: 'Extended' },
    ];

    for (const difficulty of difficulties) {
        await prisma.difficulty.upsert({
            where: { id: difficulty.id },
            update: {},
            create: difficulty,
        });
    }

    console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });