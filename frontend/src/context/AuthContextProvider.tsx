import {useEffect, useState} from "react";
import {Backend, backendUrl} from "../util/Backend";
import {AuthContext} from "./AuthContext";

export default function AuthContextProvider({children}: {children: React.ReactNode}) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [username, setUsername] = useState<string | null>(null);
	const [useravatar, setUseravatar] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const login = async (username: string, password: string) => {
		const response = await Backend.POST("/login", {username, password});

		if (response.ok) {
			const data = response.data;
			setLoggedIn(true);
			setToken(data.token);
			await updateUserProfile();
			localStorage.setItem("username", username);
		} else {
			const error = response.error;
			const errorMessage = error || "Login failed";
			alert(errorMessage);
		}
		setLoading(false);
		return response.ok;
	};

	const register = async (username: string, email: string, password: string) => {
		const response = await Backend.POST("/register", {username, email, password});

		if (response.ok) {
			const data = response.data;
			alert("Registration successful. Please log in.");
		} else {
			const error = response.error;
			const errorMessage = error || "Registration failed";
			alert(errorMessage);
			return false;
		}
		return true;
	};

	const updateUserProfile = async () => {
		const serverData = await Backend.GET("/api/me");
		if (!serverData.ok) {
			console.error("Failed to fetch user profile data");
			return;
		}
		const data = serverData.data;
		setUsername(data.username);
		setUseravatar(data.avatar_uri ? `${backendUrl}/${data.avatar_uri}` : "https://placehold.co/100");
	};

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			setToken(storedToken);
			updateUserProfile();
			setLoggedIn(true);
			setLoading(false);
		}
		return () => {
			console.log("AuthContextProvider unmounted");
		};
	}, []);

	useEffect(() => {
		if (loading) return;
		if (token === null) {
			localStorage.removeItem("token");
		} else {
			localStorage.setItem("token", token);
		}
	}, [token]);

	const logout = () => {
		setLoggedIn(false);
		setUsername(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{loggedIn, username, token, login, logout, useravatar, register, loading, updateUserProfile}}>
			{children}
		</AuthContext.Provider>
	);
}
