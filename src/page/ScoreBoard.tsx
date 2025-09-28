import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { defaultScoreboard, fetchScoreboard } from "../service/Score";

interface Score{
    player: string,
    score: number,
    date: string;
  }
  
const ScoreBoard: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    fetchScoreboard()
      .then((data) => {
        setScores(data);
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
