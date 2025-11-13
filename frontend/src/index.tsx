import ReactDOM from "react-dom/client";
import "./style/index.css";
import {HashRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import AuthContextProvider from "./context/AuthContextProvider";
import {ThemeProvider} from "./context/ThemeContextProvider";
import App from "./page/App";
import AuthScreen from "./page/AuthScreen";
import GameScreen from "./page/GameScreen";
import ProfileScreen from "./page/ProfileScreen";
import SettingsScreen from "./page/SettingsScreen";
import VerifyEmailScreen from "./page/VerifyEmailScreen";
import NewPasswordScreen from "./page/NewPasswordScreen";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<ThemeProvider>
		<AuthContextProvider>
			<div className="w-full min-h-screen overflow-x-hidden md:overflow-y-hidden">
				<HashRouter>
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="/game" element={<GameScreen />} />
						<Route path="/auth" element={<AuthScreen />} />
						<Route path="/profile" element={<ProfileScreen />} />
						<Route path="/settings" element={<SettingsScreen />} />
						<Route path="/verify-email" element={<VerifyEmailScreen />} />
						<Route path="/reset-password" element={<NewPasswordScreen />} />
						
					</Routes>
				</HashRouter>
			</div>
			<ToastContainer position="bottom-right" theme="dark" />
		</AuthContextProvider>
	</ThemeProvider>,
);
