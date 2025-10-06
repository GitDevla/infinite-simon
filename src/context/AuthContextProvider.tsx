import {useState} from "react";
import {AuthContext} from "./AuthContext";

export default function AuthContextProvider({children}: {children: React.ReactNode}) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [username, setUsername] = useState<string | null>(null);
	const [useravatar, setUseravatar] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);

	const login = async (username: string, password: string) => {
		// todo
		setLoggedIn(true);
		setUsername(username);
		setUseravatar("https://placehold.co/100");
		setToken("dummy-token");
	};

	const logout = () => {
		setLoggedIn(false);
		setUsername(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{loggedIn, username, token, login, logout, useravatar}}>
			{children}
		</AuthContext.Provider>
	);
}
