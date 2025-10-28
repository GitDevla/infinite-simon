const backendUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

type BackendResponseOkResponse = {
	ok: true;
	data: any;
};

type BackendResponseErrorResponse = {
	ok: false;
	error: string;
};

type BackendResponse = BackendResponseOkResponse | BackendResponseErrorResponse;

export class Backend {
	static async GET(path: string, queryParams?: URLSearchParams | Record<string, string>): Promise<BackendResponse> {
		const token = localStorage.getItem("token") || "";
		const res = await fetch(
			`${backendUrl}${path}${queryParams ? `?${new URLSearchParams(queryParams).toString()}` : ""}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const json = await res.json();
		if (!res.ok) {
			return {
				ok: false,
				error: json.error || json.errorMessage,
			};
		}
		return {
			ok: true,
			data: json,
		};
	}

	static async POST(path: string, body: any): Promise<BackendResponse> {
		const token = localStorage.getItem("token") || "";
		const res = await fetch(`${backendUrl}${path}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		});
		const json = await res.json();
		if (!res.ok) {
			return {
				ok: false,
				error: json.error || json.errorMessage,
			};
		}
		return {
			ok: true,
			data: json,
		};
	}

	static async GETPROMISE(path: string, queryParams?: URLSearchParams | Record<string, string>): Promise<any> {
		const res = await Backend.GET(path, queryParams);
		if (!res.ok) {
			throw new Error(res.error);
		}
		return res.data;
	}

	static async POSTPROMISE(path: string, body: any): Promise<any> {
		const res = await Backend.POST(path, body);
		if (!res.ok) {
			throw new Error(res.error);
		}
		return res.data;
	}
}
