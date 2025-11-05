import {createContext} from "react";

export const AuthContext = createContext<{
	loggedIn: boolean;
	username: string | null;
	useravatar: string | null;
	loading: boolean;
	login: (username: string, password: string) => Promise<boolean>;
	register: (username: string, email: string, password: string) => Promise<boolean>;
	updateUserProfile: () => Promise<void>;
	logout: () => void;
}>({
	loggedIn: false,
	username: null,
	useravatar: null,
	loading: true,
	login: async (username: string, password: string) => false,
	register: async (username: string, email: string, password: string) => false,
	updateUserProfile: async () => {},
	logout: () => {},
});
