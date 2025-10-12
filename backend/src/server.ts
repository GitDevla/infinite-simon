import cors from "cors";
import express from "express";
import { loginController, registerController } from "./controller/auth.controller";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/login", loginController);
app.post("/register", registerController);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT} (Development)`);
});
