import {useContext, useEffect, useId, useRef, useState} from "react";
import {toast} from "react-toastify";
import {AuthContext} from "../context/AuthContext";
import {
	GAME_MODE_LABELS,
	GAME_TYPE_LABELS,
	GameMode,
	GameType,
	gameModeToString,
	gameTypeToString,
	LABEL_TO_GAME_MODE,
	LABEL_TO_GAME_TYPE,
} from "../service/Game";
import {Backend} from "../util/Backend";

export default function UserScoresList() {
	const [scores, setScores] = useState<
		{diff: GameType; mode: GameMode; score: number; date: string; placement?: number}[]
	>([]);
	const authContext = useContext(AuthContext);

	const [modeFilter, setModeFilter] = useState<GameMode | "all">("all");
	const [typeFilter, setTypeFilter] = useState<GameType | "all">("all");
	const pagenationIDX = useRef(1);

	const modeSelectId = useId();
	const typeSelectId = useId();

	const sentinelRef = useRef<HTMLDivElement | null>(null);

	const fetchUserData = async () => {
		const params: {mode?: string; diff?: string; page?: number; limit?: number} = {};
		if (modeFilter !== "all") {
			params.mode = GAME_MODE_LABELS[modeFilter];
		}
		if (typeFilter !== "all") {
			params.diff = GAME_TYPE_LABELS[typeFilter];
		}
		params.page = pagenationIDX.current;
		params.limit = 10;

		const resp = await Backend.getUserStats(params);
		if (!resp.ok) {
			toast.error(`Failed to fetch scores: ${resp.error}`);
			return {scores: []};
		}
		const json = resp.data;

		return {
			scores: json.scores.map(score => ({
				diff: LABEL_TO_GAME_TYPE[score.difficulty],
				mode: LABEL_TO_GAME_MODE[score.mode],
				score: score.score,
				date: score.date,
				placement: score.placement,
			})),
		};
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: pls biome stop
	useEffect(() => {
		if (authContext.loading) return;
		pagenationIDX.current = 1;
		fetchUserData().then(fetched => {
			setScores(fetched.scores);
		});
	}, [modeFilter, typeFilter, authContext.loading]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: pt 2.
	useEffect(() => {
		if (authContext.loading) return;
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						pagenationIDX.current += 1;
						fetchUserData().then(fetched => {
							setScores(prevScores => [...prevScores, ...fetched.scores]);
						});
					}
				});
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 1.0,
			},
		);

		if (sentinelRef.current) {
			observer.observe(sentinelRef.current);
		}

		return () => {
			if (sentinelRef.current) {
				observer.unobserve(sentinelRef.current);
			}
		};
	}, [authContext.loading, modeFilter, typeFilter]);

	return (
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
						<option value={GameMode.SinglePlayer}>Singleplayer</option>
						<option value={GameMode.MultiPlayer}>Multiplayer</option>
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
						<option value={GameType.Simple}>Classic</option>
						<option value={GameType.Extended}>Extended</option>
					</select>
				</div>
			</div>
			<ul className="flex flex-col gap-3 w-full">
				{scores.map((score, index) => (
					<li
						key={index}
						className="flex border border-gray-600 p-4 w-full justify-between bg-bg-secondary rounded-xl bg-opacity-80 hover:scale-105 transition-transform duration-200">
						<div className="flex flex-col gap-1">
							<div className="flex items-center gap-2">
								<span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
									Difficulty:
								</span>
								<span className="font-semibold text-white">{gameTypeToString(score.diff)}</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Mode:</span>
								<span className="font-semibold text-white">{gameModeToString(score.mode)}</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Date:</span>
								<span className="text-sm text-gray-300">{score.date}</span>
							</div>
						</div>
						<div className="flex flex-col items-end justify-center">
							<span className="text-3xl font-bold text-white">{score.score}</span>
							{score.placement && (
								<span className="text-xs font-medium text-yellow-400 mt-1">🏆 #{score.placement}</span>
							)}
						</div>
					</li>
				))}
			</ul>
			<div ref={sentinelRef} className="h-6" />
		</div>
	);
}
