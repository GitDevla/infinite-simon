import {Link} from "react-router-dom";

export default function NavCard({
	lvlId,
	title,
	description,
	imageUrl,
}: {
	lvlId: string;
	title: string;
	description: string;
	imageUrl: string;
}) {
	return (
		<div className="bg-[#414141] bg-opacity-70 text-black rounded-xl w-80 aspect-[4/5]">
			<div>
				{imageUrl && (
					<img
						src={imageUrl}
						alt={title}
						className="w-full object-cover mb-2 rounded-lg aspect-[4/3] opacity-70"
					/>
				)}
			</div>
			<div className="mt-2 pb-4">
				<div>
					<h2 className="text-xl font-bold mb-2 text-center">{title}</h2>
					{/* <p>{description}</p> */}
				</div>
				<div className="flex justify-center flex-col items-center">
					<Link
						to={`/game?diff=${lvlId || "classic"}&mode=single`}
						className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-[80%] text-center">
						Play Alone
					</Link>
					<Link
						to={`/game?diff=${lvlId || "classic"}&mode=multi`}
						className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-[80%] text-center">
						Play with Friends
					</Link>
				</div>
			</div>
		</div>
	);
}
