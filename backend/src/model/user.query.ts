import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserQuery {
	static async getUserByUsername(username: string) {
		return prisma.user.findUnique({
			where: { username },
		});
	}

	static async createUser(username: string, email: string, passwordHash: string) {
		return prisma.user.create({
			data: { username, email, password_hash: passwordHash, avatar: "" },
		});
	}
}
