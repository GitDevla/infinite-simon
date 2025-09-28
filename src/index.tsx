import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./page/App";
import GameScreen from "./page/GameScreen";
import ScoreBoard from "./page/ScoreBoard"
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	// <React.StrictMode>
	<HashRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/game" element={<GameScreen />} />
			<Route path="/score" element={<ScoreBoard />} />
		</Routes>
	</HashRouter>,
	// </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
