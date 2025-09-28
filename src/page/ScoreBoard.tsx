import { useEffect,useState } from "react";
import defaultScoreboard from "../component/defaultScoreboard";
import { Link } from "react-router-dom";

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
      <div
				style={{
					display: "flex",
					justifyContent: "space-evenly",
					marginTop: "20px",
				}}
			>
				<Link to="/">
					<div
						className="navButton"
						style={{
							width: "120px",
						}}
					>
						Homescreen
					</div>
				</Link>
				<Link to="/score" onClick={defaultScoreboard}>
					<div
						className="navButton"
						style={{
							width: "120px",
						}}
					>
						Clear scores
					</div>
				</Link>
			</div>
    </div>
  );
}

export default ScoreBoard;
