import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Layout from "../component/Layout";
import UserScoresList from "../component/UserScoresList";
import {AuthContext} from "../context/AuthContext";

const backendUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

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

	const navigate = useNavigate();

	const fetchUserData = async () => {
		// TODO, replace mock data when backend is ready
		const multiplayer_stats_mock = {
			totalGames: 18,
			wins: 10,
			averatePlacement: 2.3,
		};

		const res = await fetch(`${backendUrl}/api/stats`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${authContext.token}`,
			},
		});
		const json = await res.json();
		return {
			total_games: json.total_games,
			best_score: json.best_score,
			average_score: json.average_score,
			singleplayer_stats: {
				totalGames: json.singleplayer_stats,
			},
			multiplayer_stats: multiplayer_stats_mock,
		};
	};

	const updateUserData = async () => {
		fetchUserData().then(fetched => {
			setUserStats({
				totalGames: fetched.total_games,
				bestScore: fetched.best_score,
				averageScore: fetched.average_score,
				singlePlayerGames: fetched.singleplayer_stats?.totalGames ?? 0,
				multiplayerGames: fetched.multiplayer_stats?.totalGames ?? 0,
				multiplayerWins: fetched.multiplayer_stats?.wins ?? 0,
				multiplayerAveragePlacement: fetched.multiplayer_stats?.averatePlacement ?? null,
			});
		});
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: no need
	useEffect(() => {
		if (authContext.loading) return;
		if (!authContext.loggedIn) {
			navigate("/auth");
		}
		updateUserData();
	}, [authContext.loggedIn, authContext.loading]);

	return (
		<Layout header="Profile">
			<div className="max-w-[500px] mx-auto">
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
					<UserScoresList />
				</div>
			</div>
		</Layout>
	);
}
