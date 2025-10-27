import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserQuery {
	static async getUserByUsername(username: string) {
		return prisma.user.findUnique({
			where: { username },
		});
	}

	static async createUser(username: string, email: string, passwordHash: string, avatar_uri: string = "") {
		return prisma.user.create({
			data: { username, email, password_hash: passwordHash, avatar_uri: "" },
		});
	}

	static async updateUser(username: string, data: Partial<{ username: string; email: string; password_hash: string; avatar_uri: string; last_login: Date }>) {
		return prisma.user.update({
			where: { username },
			data,
		});
	}

	static async deleteUser(username: string) {
		return prisma.user.delete({
			where: { username },
		});
	}

	static async updateUserLastLogin(username: string, date: Date) {
		return prisma.user.update({
			where: { username },
			data: { last_login: date },
		});
	}

	static async getUserScores(username: string) {
		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) throw new Error("User not found");
		return prisma.participant.findMany({
			where: { userId: user.id },
			orderBy: { achieved_at: "desc" },
		});
	}

	static async getUserPlacementInMatch(username: string, matchId: number) {
		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) throw new Error("User not found");
		const participants = await prisma.participant.findMany({
			where: { matchId },
			orderBy: { round_eliminated: "desc" },
		});
		const placement = participants.findIndex(p => p.userId === user.id) + 1;
		return { placement, total: participants.length };
	}

	static async getTotalGamesPlayed(username: string) {
		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) throw new Error("User not found");
		const totalGames = await prisma.participant.count({
			where: { userId: user.id },
		});
		return totalGames;
	}

	static async getBestScore(username: string) {
		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) throw new Error("User not found");
		const bestParticipant = await prisma.participant.findFirst({
			where: { userId: user.id },
			orderBy: { round_eliminated: "desc" },
		});
		return bestParticipant ? bestParticipant.round_eliminated : null;
	}

	static async getAverageScore(username: string) {
		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) throw new Error("User not found");
		const participants = await prisma.participant.findMany({
			where: { userId: user.id },
		});
		if (participants.length === 0) return null;
		const totalScore = participants.reduce((sum, p) => sum + p.round_eliminated, 0);
		return totalScore / participants.length;
	}

	static async getSinglePlayerStats(username: string) {
		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) throw new Error("User not found");
		const totalGames = await this.getTotalGamesPlayed(username);
		return totalGames;
	}

	static async getMultiPlayerStats(username: string) {
		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) throw new Error("User not found");
		const multiplayerGames = await prisma.participant.count({
			where: {
				userId: user.id,
				match: {
					game: {
						modeId: 2, //TODO: remove hardcoding
					},
				},
			},
		});
		return multiplayerGames;
	}
}
