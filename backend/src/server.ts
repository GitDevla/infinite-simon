import cors from "cors";
import express from "express";
import { loginController, registerController } from "./controller/auth.controller";
import { startNewGameController, saveGameResultController } from "./controller/game.controller";
import { getMe } from "./controller/me.controller";
import { authMiddleware } from "./middleware/auth.middleware";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/login", loginController);
app.post("/register", registerController);
app.post("/start-game", startNewGameController);
app.post("/save-game-result", authMiddleware, saveGameResultController);

app.get("/api/me", authMiddleware, getMe);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT} (Development)`);
});
