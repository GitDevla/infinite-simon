const backendUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

type BackendResponseOkResponse<T = any> = {
	ok: true;
	data: T;
};

type BackendResponseErrorResponse = {
	ok: false;
	error: string;
};

type BackendResponse<T = any> = BackendResponseOkResponse<T> | BackendResponseErrorResponse;

export class Backend {
	static async GET<T = any>(
		path: string,
		queryParams?: URLSearchParams | Record<string, string>,
	): Promise<BackendResponse<T>> {
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

	static async POST<T = any>(path: string, body: any): Promise<BackendResponse<T>> {
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

	static async GETPROMISE<T = any>(path: string, queryParams?: URLSearchParams | Record<string, string>): Promise<T> {
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
}
