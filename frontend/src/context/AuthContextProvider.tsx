import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Backend, type UserProfile} from "../util/Backend";
import {AuthContext} from "./AuthContext";

export default function AuthContextProvider({children}: {children: React.ReactNode}) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	const login = async (username: string, password: string) => {
		const response = await Backend.login(username, password);

		if (response.ok) {
			const data = response.data;
			setLoggedIn(true);
			saveToken(data.token);
			await updateUserProfile();
			localStorage.setItem("username", username);
		} else {
			const error = response.error;
			const errorMessage = error || "Login failed";
			toast.error(errorMessage);
		}
		setLoading(false);
		return response.ok;
	};

	const register = async (username: string, email: string, password: string) => {
		const response = await Backend.register(username, email, password);

		if (response.ok) {
			toast.success("Registration successful. Please log in.");
		} else {
			const error = response.error;
			const errorMessage = error || "Registration failed";
			toast.error(errorMessage);
			return false;
		}
		return true;
	};

	const updateUserProfile = async () => {
		const serverData = await Backend.getUserProfile();
		if (!serverData.ok) {
			console.error("Failed to fetch user profile data");
			return;
		}
		const data = serverData.data;
		setUser(data);
	};

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			updateUserProfile();
			setLoggedIn(true);
			setLoading(false);
		}
		return () => {
			console.log("AuthContextProvider unmounted");
		};
	}, []);

	const saveToken = (newToken: string | null) => {
		if (newToken === null) {
			localStorage.removeItem("token");
		} else {
			localStorage.setItem("token", newToken);
		}
	};

	const logout = () => {
		setLoggedIn(false);
		setUser(null);
		saveToken(null);
	};

	return (
		<AuthContext.Provider value={{loggedIn, user, login, logout, register, loading, updateUserProfile}}>
			{children}
		</AuthContext.Provider>
	);
}
