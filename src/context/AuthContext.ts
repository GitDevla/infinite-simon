import {createContext} from "react";

export const AuthContext = createContext<{
	loggedIn: boolean;
	username: string | null;
	useravatar: string | null;
	token: string | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
}>({
	loggedIn: false,
	username: null,
	useravatar: null,
	token: null,
	login: async () => {},
	logout: () => {},
});
