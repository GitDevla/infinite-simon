import {useRef} from "react";

export default function FloatingInput({
	type = "text",
	label = "Floating outlined",
	state,
	setState,
}: {
	type: string;
	label: string;
	state: string;
	setState: (value: string) => void;
}) {
	const ref = useRef<HTMLInputElement>(null);
	return (
		<div className="relative">
			<input
				type={type}
				className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-bg-secondary rounded-lg border-1 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-500 peer"
				placeholder=" "
				value={state}
				ref={ref}
				onChange={e => setState(e.target.value)}
			/>
			<label
				htmlFor="floating_outlined"
				className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 bg-bg-secondary rounded-md cursor-text"
				onClick={() => ref.current?.focus()}
				onKeyDown={() => {}}>
				{label}
			</label>
		</div>
	);
}
