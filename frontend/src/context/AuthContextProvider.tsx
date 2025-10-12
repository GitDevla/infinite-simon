import {useState} from "react";
import {AuthContext} from "./AuthContext";

const backendUrl = "http://localhost:3001";

export default function AuthContextProvider({children}: {children: React.ReactNode}) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [username, setUsername] = useState<string | null>(null);
	const [useravatar, setUseravatar] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);

	const login = async (username: string, password: string) => {
		const response = await fetch(`${backendUrl}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({username, password}),
		});

		if (response.ok) {
			const data = await response.json();
			setLoggedIn(true);
			setUsername(username);
			setUseravatar("https://placehold.co/100"); //todo
			setToken(data.token);
		} else {
			alert("Login failed");
		}
		return response.ok;
	};

	const register = async (username: string, email: string, password: string) => {
		const response = await fetch(`${backendUrl}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({username, email, password}),
		});

		if (response.ok) {
			const data = await response.json();
			alert("Registration successful. Please log in.");
		} else {
			alert("Registration failed");
			return false;
		}
		return true;
	}

	const logout = () => {
		setLoggedIn(false);
		setUsername(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{loggedIn, username, token, login, logout, useravatar,register}}>
			{children}
		</AuthContext.Provider>
	);
}
