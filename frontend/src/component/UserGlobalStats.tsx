import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {AuthContext} from "../context/AuthContext";
import {Backend, type UserStats} from "../util/Backend";

export default function UserGlobalStats() {
	const authContext = useContext(AuthContext);

	const [userStats, setUserStats] = useState<UserStats | null>(null);

	const navigate = useNavigate();

	const fetchUserData = async () => {
		const json = await Backend.getUserStats({});
		if (!json.ok) {
			toast.error(`Failed to fetch user stats: ${json.error}`);
			return null;
		}
		return json.data;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: no need
	useEffect(() => {
		if (authContext.loading) return;
		if (!authContext.loggedIn) {
			navigate("/auth");
		}
		updateUserData();
	}, [authContext.loggedIn, authContext.loading]);

	const updateUserData = async () => {
		fetchUserData().then(fetched => {
			setUserStats(fetched);
		});
	};

	return (
		<div className="grid grid-cols-2 gap-3 mb-4">
			<div className="col-span-2 border border-gray-600 p-4 w-full justify-between bg-bg-secondary rounded-xl bg-opacity-80 text-center">
				<h3 className="text-xl font-bold">Global Stats</h3>
				<div className="grid grid-cols-3 justify-between mt-2">
					<div>
						<span className="text-xs text-fg-secondary">Best Score</span>
						<br />
						<span className="text-xl font-bold">{userStats?.bestScore ?? "N/A"}</span>
					</div>
					<div>
						<span className="text-xs text-fg-secondary">Total Games</span>
						<br />
						<span className="text-xl font-bold">{userStats?.totalGames}</span>
					</div>
					<div>
						<span className="text-xs text-fg-secondary">Average Score</span>
						<br />
						<span className="text-xl font-bold">
							{userStats?.averageScore ? userStats?.averageScore.toFixed(1) : "N/A"}
						</span>
					</div>
				</div>
			</div>
			<div className="border border-gray-600 p-4 w-full justify-between bg-bg-secondary rounded-xl bg-opacity-80">
				<h3 className="text-lg font-bold mb-2 text-center">Single Player</h3>
				<div className="flex justify-between">
					<span className="text-xs text-fg-secondary">Games Played</span>
					<span className="text-xl font-bold">{userStats?.singleplayerStats}</span>
				</div>
			</div>
			<div className="border border-gray-600 p-4 w-full justify-between bg-bg-secondary rounded-xl bg-opacity-80">
				<h3 className="text-lg font-bold mb-2 text-center">Multiplayer</h3>
				<div className="flex justify-between">
					<span className="text-xs text-fg-secondary">Games Played</span>
					<span className="text-xl font-bold">{userStats?.multiplayerStats.totalGames}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-xs text-fg-secondary">Wins</span>
					<span className="text-xl font-bold">{userStats?.multiplayerStats.wins}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-xs text-fg-secondary">Avg. Placement</span>
					<span className="text-xl font-bold">
						{userStats?.multiplayerStats.averatePlacement
							? userStats.multiplayerStats.averatePlacement.toFixed(1)
							: "N/A"}
					</span>
				</div>
			</div>
		</div>
	);
}
