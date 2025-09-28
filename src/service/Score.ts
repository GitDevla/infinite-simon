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

async function fetchScoreboard(): Promise<Score[]> {
    const res = await fetch("/scores/scores.json")
    const json = await res.json();
    const sorted = json.scores.sort((a: Score, b: Score) => b.score - a.score);
    return sorted;
}
    
