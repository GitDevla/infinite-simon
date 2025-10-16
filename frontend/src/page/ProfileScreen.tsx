import {useContext, useEffect, useId, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../component/Header";
import Logo from "../component/Logo";
import {AuthContext} from "../context/AuthContext";
import {GameMode, GameType, gameModeToString, gameTypeToString} from "../service/Game";

export default function ProfileScreen() {
	const authContext = useContext(AuthContext);

	const username = authContext.username;
	const userAvatar = authContext.useravatar;

	const [userStats, setUserStats] = useState<{
		totalGames: number;
		bestScore: number | null;
		averageScore: number | null;
		singlePlayerGames: number;
		multiplayerGames: number;
		multiplayerWins: number;
		multiplayerAveragePlacement: number | null;
	} | null>(null);
	const [scores, setScores] = useState<
		{difficulty: GameType; mode: GameMode; score: number; date: string; placement?: number}[]
	>([]);
	const [modeFilter, setModeFilter] = useState<GameMode | "all">("all");
	const [typeFilter, setTypeFilter] = useState<GameType | "all">("all");
	const navigate = useNavigate();
	const modeSelectId = useId();
	const typeSelectId = useId();

	const fetchUserData = async () => {
		// TODO, mock data for now
		return {
			totalGames: 42,
			bestScore: 30,
			averageScore: 18.4,
			singlePlayerStats: {
				totalGames: 24,
			},
			multiplayerStats: {
				totalGames: 18,
				wins: 10,
				averatePlacement: 2.3,
			},

			scores: [
				{difficulty: GameType.Simple, mode: GameMode.MultiPlayer, score: 10, date: "2025-10-04", placement: 5},
				{
					difficulty: GameType.Extended,
					mode: GameMode.MultiPlayer,
					score: 15,
					date: "2025-10-03",
					placement: 2,
				},
				{difficulty: GameType.Simple, mode: GameMode.SinglePlayer, score: 8, date: "2025-10-02"},
				{difficulty: GameType.Extended, mode: GameMode.SinglePlayer, score: 12, date: "2025-10-01"},
			],
		};
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: no need
	useEffect(() => {
		if (!authContext.loggedIn) {
			navigate("/auth");
		}
		fetchUserData().then(fetched => {
			setScores(fetched.scores);
			setUserStats({
				totalGames: fetched.totalGames,
				bestScore: fetched.bestScore,
				averageScore: fetched.averageScore,
				singlePlayerGames: fetched.singlePlayerStats?.totalGames ?? 0,
				multiplayerGames: fetched.multiplayerStats?.totalGames ?? 0,
				multiplayerWins: fetched.multiplayerStats?.wins ?? 0,
				multiplayerAveragePlacement: fetched.multiplayerStats?.averatePlacement ?? null,
			});
		});
	}, []);

	const filteredScores = scores.filter(score => {
		return (
			(modeFilter === "all" || score.mode === Number(modeFilter)) &&
			(typeFilter === "all" || score.difficulty === Number(typeFilter))
		);
	});

	return (
		<div className="mt-16">
			<Header />
			<Logo size="large" />
			<div className="max-w-[500px] mx-auto">
				<h2 className="text-2xl font-semibold text-center mb-6 mt-2">Profile</h2>
				<div className="flex flex-col items-center">
					{userAvatar ? (
						<img src={userAvatar} alt="User Avatar" className="w-32 h-32 rounded-full mb-4" />
					) : (
						<div className="w-32 h-32 rounded-full mb-4 bg-gray-700 flex items-center justify-center text-xl text-gray-300">
							{username?.[0] ?? "U"}
						</div>
					)}
					<h3 className="text-xl font-medium">{username}</h3>
					<div className="mt-6 w-full">
						{userStats && (
							<div className="grid grid-cols-2 gap-3 mb-4">
								<div className="col-span-2 border border-gray-600 p-4 w-full justify-between bg-bg-secondary rounded-xl bg-opacity-80 text-center">
									<h3 className="text-xl font-bold">Global Stats</h3>
									<div className="grid grid-cols-3 justify-between mt-2">
										<div>
											<span className="text-xs text-gray-400">Best Score</span>
											<br />
											<span className="text-xl font-bold">{userStats.bestScore ?? "N/A"}</span>
										</div>
										<div>
											<span className="text-xs text-gray-400">Total Games</span>
											<br />
											<span className="text-xl font-bold">{userStats.totalGames}</span>
										</div>
										<div>
											<span className="text-xs text-gray-400">Average Score</span>
											<br />
											<span className="text-xl font-bold">
												{userStats.averageScore ? userStats.averageScore.toFixed(1) : "N/A"}
											</span>
										</div>
									</div>
								</div>
								<div className="border border-gray-600 p-4 w-full justify-between bg-bg-secondary rounded-xl bg-opacity-80">
									<h3 className="text-lg font-bold mb-2 text-center">Single Player</h3>
									<div className="flex justify-between">
										<span className="text-xs text-gray-400">Games Played</span>
										<span className="text-xl font-bold">{userStats.singlePlayerGames}</span>
									</div>
								</div>
								<div className="border border-gray-600 p-4 w-full justify-between bg-bg-secondary rounded-xl bg-opacity-80">
									<h3 className="text-lg font-bold mb-2 text-center">Multiplayer</h3>
									<div className="flex justify-between">
										<span className="text-xs text-gray-400">Games Played</span>
										<span className="text-xl font-bold">{userStats.multiplayerGames}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-xs text-gray-400">Wins</span>
										<span className="text-xl font-bold">{userStats.multiplayerWins}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-xs text-gray-400">Avg. Placement</span>
										<span className="text-xl font-bold">
											{userStats.multiplayerAveragePlacement
												? userStats.multiplayerAveragePlacement.toFixed(1)
												: "N/A"}
										</span>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className="w-full">
						<h4 className="text-lg font-semibold mb-4">Score History</h4>
						<div className="flex gap-4 mb-6 p-4 bg-bg-secondary rounded-xl">
							<div className="flex-1">
								<label
									htmlFor={modeSelectId}
									className="block mb-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
									Mode
								</label>
								<select
									id={modeSelectId}
									value={modeFilter}
									onChange={e => setModeFilter(e.target.value as GameMode | "all")}
									className="w-full p-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:bg-gray-700">
									<option value="all">All Modes</option>
									<option value={GameMode.SinglePlayer}>Single Player</option>
									<option value={GameMode.MultiPlayer}>Multi Player</option>
								</select>
							</div>
							<div className="flex-1">
								<label
									htmlFor={typeSelectId}
									className="block mb-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
									Difficulty
								</label>
								<select
									id={typeSelectId}
									value={typeFilter}
									onChange={e => setTypeFilter(e.target.value as GameType | "all")}
									className="w-full p-2.5 bg-gray-800 border border-gray-600 rounded-lg text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:bg-gray-700">
									<option value="all">All Difficulties</option>
									<option value={GameType.Simple}>Simple</option>
									<option value={GameType.Extended}>Extended</option>
								</select>
							</div>
						</div>
						<ul className="flex flex-col gap-3 w-full">
							{filteredScores.map((score, index) => (
								<li
									key={index}
									className="flex border border-gray-600 p-4 w-full justify-between bg-bg-secondary rounded-xl bg-opacity-80 hover:scale-105 transition-transform duration-200">
									<div className="flex flex-col gap-1">
										<div className="flex items-center gap-2">
											<span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
												Difficulty:
											</span>
											<span className="font-semibold text-white">
												{gameTypeToString(score.difficulty)}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
												Mode:
											</span>
											<span className="font-semibold text-white">
												{gameModeToString(score.mode)}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
												Date:
											</span>
											<span className="text-sm text-gray-300">{score.date}</span>
										</div>
									</div>
									<div className="flex flex-col items-end justify-center">
										<span className="text-3xl font-bold text-white">{score.score}</span>
										{score.placement && (
											<span className="text-xs font-medium text-yellow-400 mt-1">
												🏆 #{score.placement}
											</span>
										)}
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
