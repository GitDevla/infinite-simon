import clsx from "clsx";

export default function InputShelf({children, className}: {children: React.ReactNode; className?: string}) {
	let numberOfChildren = 0;
	if (Array.isArray(children)) {
		numberOfChildren = children.length;
	} else if (children) {
		numberOfChildren = 1;
	}
	return (
		<div className={clsx("size-full", className)}>
			<div
				className="flex gap-5 justify-center items-center size-full transition-[max-width,padding]"
				style={{
					padding: numberOfChildren === 0 ? 0 : "0.75rem",
					maxWidth: numberOfChildren === 0 ? 0 : "fit-content",
				}}>
				{children}
			</div>
		</div>
	);
}
