interface Score {
	player: string;
	score: number;
	date: string;
}

export async function positionOnScoreboardIfInserted(score: number): Promise<number> {
	const scores = await fetchScoreboard();
	let position = scores.findIndex(s => s.score < score);
	if (position === -1) position = scores.length;
	return position + 1;
}

export async function fetchScoreboard(): Promise<Score[]> {
	const res = await fetch("/scores/scores.json");
	const json = await res.json();
	const sorted = json.scores.sort((a: Score, b: Score) => b.score - a.score);
	return sorted;
}

export async function saveScore(name: string, score: number) {
	fetch("http://localhost:3001/save-score", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({player: name, score}),
	})
		.then(res => res.json())
		.then(data => {
			if (data.success) {
				console.log("Score saved!");
			} else {
				console.error("Failed to save:", data.error);
			}
		})
		.catch(err => console.error("Error:", err));
}

export function defaultScoreboard() {
	fetch("http://localhost:3001/default-scoreboard", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			scores: [
				{
					player: "Simonfi Sándor né",
					score: -2,
					date: "2025-09-21T14:32:00Z",
				},
				{
					player: "Simonfi Sándor",
					score: -1,
					date: "2025-09-21T14:40:00Z",
				},
			],
		}),
	})
		.then(res => res.json())
		.then(data => {
			if (data.success) {
				console.log("Reset Json to default!");
			} else {
				console.error("Failed to reset to default:", data.error);
			}
		})
		.catch(err => console.error("Error:", err));
}
