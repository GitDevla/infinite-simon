import cors from "cors";
import express from "express";
import { loginController, registerController } from "./controller/auth.controller";
import { startNewGameController } from "./controller/game.controller";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/login", loginController);
app.post("/register", registerController);
app.post("/start-game", startNewGameController);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT} (Development)`);
});
