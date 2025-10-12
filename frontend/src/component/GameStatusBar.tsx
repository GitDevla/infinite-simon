import clsx from "clsx";

export default function GameStatusBar({replaying}: {replaying: boolean}) {
	return (
		<div className={clsx("status-pill bg-opacity-75", replaying ? "bg-orange-500" : "bg-green-500")}>
			<div className={clsx("status-indicator", replaying ? "bg-red-600" : "bg-green-700")}></div>
			{replaying ? <p>Wait for sequence to end</p> : <p>Now it's your turn</p>}
		</div>
	);
}
