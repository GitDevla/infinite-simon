export const backendUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

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
	private static async request<T = any>(
		method: "GET" | "POST" | "PUT",
		queryParamsOrBody?: URLSearchParams | Record<string, string> | any,
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

		const res = await fetch(url, options);
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

	static async GET<T = any>(
		path: string,
		queryParams?: URLSearchParams | Record<string, string>,
	): Promise<BackendResponse<T>> {
		return Backend.request<T>("GET", queryParams, path);
	}

	static async POST<T = any>(path: string, body: any): Promise<BackendResponse<T>> {
		return Backend.request<T>("POST", body, path);
	}

	static async PUT<T = any>(path: string, body: any): Promise<BackendResponse<T>> {
		return Backend.request<T>("PUT", body, path);
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

	static async PUTPROMISE<T = any>(path: string, body: any): Promise<T> {
		const res = await Backend.PUT(path, body);
		if (!res.ok) {
			throw new Error(res.error);
		}
		return res.data;
	}
}
