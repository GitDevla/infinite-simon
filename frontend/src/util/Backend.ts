import type { GameMode, GameType } from "../service/Game";

const backendUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const DEFAULT_PROFILE_PIC_URL = `${process.env.PUBLIC_URL}/default_profile.png`;

type BackendResponseOkResponse<T = any> = {
	ok: true;
	data: T;
};

type BackendResponseErrorResponse = {
	ok: false;
	error: string;
};

type BackendResponse<T = any> = BackendResponseOkResponse<T> | BackendResponseErrorResponse;

export interface UserProfile {
	id: number;
	username: string;
	email: string;
	avatar_uri: string;
	joined_date: string;
	last_login: string;
	email_verified: boolean;
}

export interface UserStats {
	totalGames: number;
	bestScore: number;
	averageScore: number;
	multiplayerGames: number;
	singleplayerStats: number;
	scores: Score[];
	multiplayerStats: {
		totalGames: number;
		wins: number;
		averagePlacement: number | null;
	};
}

export interface Score {
	difficulty: string;
	mode: string;
	score: number;
	date: string;
	placement?: number;
}

export interface GameStartResponse {
	success: boolean;
	game: Game;
	match: Match;
}

export interface Game {
	id: number;
	modeId: number;
	difficultyId: number;
}

export interface Match {
	id: number;
	seed: number;
}

export interface ParticipantListResponse {
	success: boolean;
	participants: Participant[];
}

export interface Participant {
	user: User;
	round_eliminated: number;
	status: "waiting" | "playing" | "finished";
}

export interface User {
	username: string;
	avatar_uri: string;
}


export interface MatchStatusResponse {
	success: boolean;
	status: Status;
}

export interface Status {
	status: "waiting" | "playing" | "finished";
}



export class Backend {
	private static async request<T = any>(
		method: "GET" | "POST" | "PUT",
		queryParamsOrBody?: Record<string, any> | any,
		path?: string,
	): Promise<BackendResponse<T>> {
		const token = localStorage.getItem("token") || "";
		let url = `${backendUrl}${path}`;
		const options: RequestInit = {
			method,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		if (method === "GET" && queryParamsOrBody) {
			url += `?${new URLSearchParams(queryParamsOrBody as Record<string, string>).toString()}`;
		} else if (method === "POST" || method === "PUT") {
			options.headers = {
				...options.headers,
				"Content-Type": "application/json",
			};
			options.body = JSON.stringify(queryParamsOrBody);
		}
		let res: Response;
		try {
			res = await fetch(url, options);
		} catch (error) {
			return {
				ok: false,
				error: `Network error: ${(error as Error).message}`,
			};
		}
		let json: any;
		try {
			json = await res.json();
		} catch (error) {
			return {
				ok: false,
				error: res.statusText || "Failed to parse server response",
			};
		}
		if (!res.ok) {
			return {
				ok: false,
				error: json.error || json.errorMessage || json.message || "An error occurred",
			};
		}
		return {
			ok: true,
			data: json,
		};
	}

	static async GET<T = any>(path: string, queryParams?: Record<string, any>): Promise<BackendResponse<T>> {
		return Backend.request<T>("GET", queryParams, path);
	}

	static async POST<T = any>(path: string, body: any): Promise<BackendResponse<T>> {
		return Backend.request<T>("POST", body, path);
	}

	static async PUT<T = any>(path: string, body: any): Promise<BackendResponse<T>> {
		return Backend.request<T>("PUT", body, path);
	}

	static async GETPROMISE<T = any>(path: string, queryParams?: Record<string, any>): Promise<T> {
		const res = await Backend.GET(path, queryParams);
		if (!res.ok) {
			throw new Error(res.error);
		}
		return res.data;
	}

	static async POSTPROMISE<T = any>(path: string, body: any): Promise<T> {
		const res = await Backend.POST(path, body);
		if (!res.ok) {
			throw new Error(res.error);
		}
		return res.data;
	}

	static async PUTPROMISE<T = any>(path: string, body: any): Promise<T> {
		const res = await Backend.PUT(path, body);
		if (!res.ok) {
			throw new Error(res.error);
		}
		return res.data;
	}

	static async getBackendUrl(): Promise<string> {
		return backendUrl;
	}

	static async getUserProfile(): Promise<BackendResponse<UserProfile>> {
		const res = await Backend.GET<UserProfile>("/api/me");
		if (!res.ok) {
			return res;
		}
		res.data.avatar_uri = res.data.avatar_uri ? `${backendUrl}/${res.data.avatar_uri}` : DEFAULT_PROFILE_PIC_URL;
		return res;
	}

	static async updateUserProfile(updates: {
		username?: string;
		email?: string;
		profilePicture?: string;
		password?: string;
		currentPassword?: string;
	}): Promise<BackendResponse> {
		return Backend.PUT("/api/me", updates);
	}

	static async getUserStats(params: {
		mode?: string;
		diff?: string;
		page?: number;
		limit?: number;
	}): Promise<BackendResponse<UserStats>> {
		const res = await Backend.GET<UserStats>("/api/stats", params);
		if (!res.ok) {
			return res;
		}
		// TODO, replace mock data when backend is ready
		const multiplayer_stats_mock = {
			totalGames: 0,
			wins: 0,
			averagePlacement: null,
		};
		res.data.multiplayerStats = multiplayer_stats_mock;
		return res;
	}

	static async login(username: string, password: string): Promise<BackendResponse<{ token: { token: string } }>> {
		return Backend.POST<{ token: { token: string } }>("/login", { username, password });
	}

	static async register(
		username: string,
		email: string,
		password: string,
	): Promise<BackendResponse<{ message: string }>> {
		return Backend.POST<{ message: string }>("/register", { username, email, password });
	}

	static async saveGameResult(matchId: number, roundEliminated: number, status: "playing" | "finished" = "finished"): Promise<BackendResponse> {
		return Backend.POST("/save-game-result", { matchId, roundEliminated, status });
	}

	static async startGame(modeID: GameMode, difficultyID: GameType): Promise<BackendResponse<GameStartResponse>> {
		return Backend.POST<GameStartResponse>("/start-game", {
			modeId: modeID + 1,
			difficultyId: difficultyID + 1,
		});
	}

	static async joinMatch(matchId: number): Promise<BackendResponse<GameStartResponse>> {
		return Backend.POST<GameStartResponse>("/join-game", { matchId });
	}

	static async resendVerificationEmail(): Promise<BackendResponse<{ message: string }>> {
		return Backend.POST<{ message: string }>("/resend-verification-email", {});
	}

	static async verifyEmail(token: string): Promise<BackendResponse<{ message: string }>> {
		return Backend.POST<{ message: string }>("/verify-email", { token });
	}

	static async requestPasswordReset(email: string): Promise<BackendResponse<{ message: string }>> {
		return Backend.POST<{ message: string }>("/request-password-reset", { email });
	}

	static async resetPassword(
		token: string,
		newPassword: string,
	): Promise<BackendResponse<{ message: string }>> {
		return Backend.POST<{ message: string }>("/finalize-password-reset", { token, newPassword });
	}

	static async getParticipantList(matchId: number): Promise<BackendResponse<ParticipantListResponse>> {
		const res = await Backend.GET<ParticipantListResponse>(
			"/api/match/:matchId/participants".replace(":matchId", matchId.toString()),
		);

		if (!res.ok) {
			return res;
		}

		for (const participant of res.data.participants) {
			participant.user.avatar_uri = participant.user.avatar_uri ? `${backendUrl}/${participant.user.avatar_uri}` : DEFAULT_PROFILE_PIC_URL;
		}

		return res;
	}

	static async getMatchStatus(matchId: number): Promise<BackendResponse<MatchStatusResponse>> {
		return Backend.GET<MatchStatusResponse>(
			"/api/match/:matchId/status".replace(":matchId", matchId.toString()),
		);
	}
}
