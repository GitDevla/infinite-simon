import ReactDOM from "react-dom/client";
import "./style/index.css";
import {HashRouter, Route, Routes} from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider";
import App from "./page/App";
import AuthScreen from "./page/AuthScreen";
import GameScreen from "./page/GameScreen";
import ProfileScreen from "./page/ProfileScreen";
import ScoreBoard from "./page/ScoreBoard";
import SettingsScreen from "./page/SettingsScreen";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<AuthContextProvider>
		<div className="w-full min-h-screen overflow-x-hidden md:overflow-y-hidden">
			<HashRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/game" element={<GameScreen />} />
					<Route path="/score" element={<ScoreBoard />} />
					<Route path="/auth" element={<AuthScreen />} />
					<Route path="/profile" element={<ProfileScreen />} />
					<Route path="/settings" element={<SettingsScreen />} />
				</Routes>
			</HashRouter>
		</div>
	</AuthContextProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
