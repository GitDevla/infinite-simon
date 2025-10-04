import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultScoreboard, fetchScoreboard } from "../service/ScoreLocal";

interface Score {
	player: string;
	score: number;
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
			<table className="w-[80%] ml-[10%] mt-[5%] [&>*:nth-child(odd)]:bg-[#757575] [&>*:nth-child(even)]:bg-[#a9a9a9] rounded-t-[20%] border-collapse">
				<tr>
					<th className="py-3 bg-[#444] text-[#bbb]">Playername</th>
					<th className="py-3 bg-[#444] text-[#bbb]">Points</th>
				</tr>
				{scores.length ? (
					scores.slice(0, 10).map((entry, index) => (
						<tr key={index}>
							<td className="p-2 pr-0 border-4 border-[#444444]">
								{entry.player}
							</td>
							<td className="p-2 pr-0 border-4 border-[#444444]">
								{entry.score}
							</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan={2} className="text-center">
							No scores yet!
						</td>
					</tr>
				)}
			</table>
			<div className="flex justify-evenly mt-[20px]">
				<Link to="/">
					<div className="bg-[#aaa] text-center text-black rounded-xl border-[gray] p-3 mx-7 border-4">
						Homescreen
					</div>
				</Link>
				<Link to="/score" onClick={defaultScoreboard}>
					<div className="bg-[#aaa] text-center text-black rounded-xl border-[gray] p-3 mx-7 border-4">
						Clear scores
					</div>
				</Link>
			</div>
		</div>
	);
};

export default ScoreBoard;
