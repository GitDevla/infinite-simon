import cors from "cors";
import express from "express";
import fs from "fs";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const scoresFile = "public/scores.json";

app.post("/save-score", (req, res) => {
	const { player, score } = req.body;

	if (!player || typeof score !== "number") {
		return res.status(400).json({
			success: false,
			error: "Invalid data",
			details: "Invalid player name or score",
		});
	}

	fs.readFile(scoresFile, "utf8", (err, data) => {
		if (err)
			return res.status(500).json({
				success: false,
				error: "Could not read scores",
				details: err.message,
			});

		let scoresJSON = { scores: [] } as {
			scores: { player: string; score: number; date: string }[];
		};
		try {
			scoresJSON = JSON.parse(data);
		} catch (parseErr) {
			return res.status(500).json({
				success: false,
				error: "Invalid JSON",
				details: (parseErr as SyntaxError).message,
			});
		}

		scoresJSON.scores.push({
			player,
			score,
			date: new Date().toISOString(),
		});

		fs.writeFile(scoresFile, JSON.stringify(scoresJSON, null, 2), (err) => {
			if (err) return res.status(500).json({ error: "Could not write score" });

			res.json({ success: true });
		});
	});
});

app.post("/default-scoreboard", (req, res) => {
	const defaultScoreJson =
		'{"scores":[{"player":"Simonfi Sándor né","score":-2,"date":"2025-09-21T14:32:00Z"},{"player":"Simonfi Sándor","score":-1,"date":"2025-09-21T14:40:00Z"}]}';
	fs.writeFile(scoresFile, JSON.stringify(defaultScoreJson), "utf8", (err) => {
		if (err) {
			return res.status(500).json({
				success: false,
				error: "Could not reset to default",
			});
		}

		res.json({ success: true });
	});
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT} (Development)`);
});
