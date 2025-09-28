interface Score{
    player: string,
    score: number,
    date: string;
}

export async function positionOnScoreboardIfInserted(score: number): Promise<number>{
    const scores = await fetchScoreboard();
    let position = scores.findIndex(s => s.score < score);
    if(position === -1) position = scores.length;
    return position + 1;
}

export async function fetchScoreboard(): Promise<Score[]> {
    const res = localStorage.getItem("scores");
    if(res){
        const json = JSON.parse(res);
        const sorted = json.scores.sort((a: Score, b: Score) => b.score - a.score);
        return sorted;
    } else {
        return [];
    }
}


export function defaultScoreboard() {
    const defaultScores = {
  "scores": [
    {
      "player": "Simonfi Sándor né",
      "score": -2,
      "date": "2025-09-21T14:32:00Z"
    },
    {
      "player": "Simonfi Sándor",
      "score": -1,
      "date": "2025-09-21T14:40:00Z"
    }
  ] };
    localStorage.setItem("scores", JSON.stringify(defaultScores));
}

export function saveScore(name: string, score: number) {
    const res = localStorage.getItem("scores");
    let scores;
    if(res){
        scores = JSON.parse(res);
    } else {
        scores = { scores: [] };
    }
    scores.scores.push({ player: name, score, date: new Date().toISOString() });
    localStorage.setItem("scores", JSON.stringify(scores));
}