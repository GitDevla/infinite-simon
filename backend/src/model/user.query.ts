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
}
