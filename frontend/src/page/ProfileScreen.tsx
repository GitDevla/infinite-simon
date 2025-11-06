import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Layout from "../component/Layout/Layout";
import UserScoresList from "../component/UserScoresList";
import {AuthContext} from "../context/AuthContext";
import {Backend} from "../util/Backend";

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
		const json = await Backend.getUserStats({});
		if (!json.ok) {
			alert(`Failed to fetch user stats: ${json.error}`);
			return {
				total_games: 0,
				best_score: null,
				average_score: null,
				singleplayer_stats: {
					totalGames: 0,
				},
				multiplayer_stats: multiplayer_stats_mock,
			};
		}
		const data = json.data;
		return {
			total_games: data.totalGames,
			best_score: data.bestScore,
			average_score: data.averageScore,
			singleplayer_stats: {
				totalGames: data.singleplayerStats,
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
