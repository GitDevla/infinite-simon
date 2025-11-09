import {createContext} from "react";
import type {UserProfile} from "../util/Backend";

export const AuthContext = createContext<{
	loggedIn: boolean;
	user: UserProfile | null;
	loading: boolean;
	login: (username: string, password: string) => Promise<boolean>;
	register: (username: string, email: string, password: string) => Promise<boolean>;
	updateUserProfile: () => Promise<void>;
	logout: () => void;
}>({
	loggedIn: false,
	user: null,
	loading: true,
	login: async (username: string, password: string) => false,
	register: async (username: string, email: string, password: string) => false,
	updateUserProfile: async () => {},
	logout: () => {},
});
