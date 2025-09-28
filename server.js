const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

isProd = process.env.NODE_ENV === "production";

const scoresFile = path.join(__dirname, isProd?"build/scores/scores.json":"public/scores/scores.json");

app.post("/save-score", (req, res) => {
  const { player, score } = req.body;

  if (!player || typeof score !== "number") {
    return res.status(400).json({
      success: false,
      error: "Invalid data",
      details: err.message
    });
  }

  fs.readFile(scoresFile, "utf8", (err, data) => {
    if (err) return res.status(500).json({
      success: false,
      error: "Could not read scores",
      details: err.message
    });

    let scoresJSON = { scores: [] };
    try {
      scoresJSON = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({
        success: false,
        error: "Invalid JSON",
        details: parseErr.message
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
  fs.writeFile(scoresFile, JSON.stringify(req.body), "utf8", (err) => {

    if (err){
      return res.status(500).json({
        success:false,
        error: "Could not reset to default", 
      });
  }
    
    res.json({ success: true });
  });
});

if (isProd){
  app.use(express.static(path.join(__dirname, "./build")));

  app.use((req, res,next) => {
    res.sendFile(path.join(__dirname, "./build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} (${isProd?"Production":"Development"})`);
});