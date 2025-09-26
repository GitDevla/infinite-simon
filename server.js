const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const scoresFile = path.join(__dirname, "public/scores/scores.json");

app.post("/save-score", (req, res) => {
  const { player, score } = req.body;

  if (!player || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid data" });
  }

  fs.readFile(scoresFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Could not read scores" });

    let scoresJSON = { scores: [] };
    try {
      scoresJSON = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ error: "Invalid JSON" });
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

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});