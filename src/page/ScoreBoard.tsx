import { useEffect,useState } from "react";
import defaultScoreboard from "../component/defaultScoreboard";

interface Score{
    player: string,
    score: number,
    date: string;
  }
  
const ScoreBoard: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    fetch("/scores/scores.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.scores.sort((a: Score, b: Score) => b.score - a.score);
        setScores(sorted);
      })
      .catch((err) => console.error("Failed to load scores:", err));
  }, []);
  return (
    <div>
      <table className="scoreboard">
        <tr>
          <th>Playername</th>
          <th>Points</th>
        </tr>
        {scores.slice(0, 10).map((entry, index) => (
          <tr key={index}>
            <td>{entry.player}</td>
            <td>{entry.score}</td>
          </tr>
        ))}
      </table>
      <div>
        <a href='/'>
          <div className='navButton'
            style={{
                width: "120px",
                marginTop:"2%"
              }}>
                Homescreen
          </div>
        </a>
        <a href='/score' onClick={defaultScoreboard}>
          <div className='navButton'
            style={{
                width: "120px",
                marginTop:"2%"
              }}>
                Clear scores
          </div>
        </a>
      </div>
    </div>
  );
}

export default ScoreBoard;
