import {useEffect, useRef, useState} from "react";
import type {Sequence} from "../service/Sequence";
import sleep from "../util/sleep";

export function useSequenceAnimation(
	sequence: Sequence | null,
	moveSpeedInMs: number,
	onUpdateInput: (id: string, value: any) => void,
	onResetInputs: () => void,
) {
	const [pointerPosition, setPointerPosition] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const [replaying, setReplaying] = useState(false);
	const buttonRefs = useRef<any>({});

	const moveCursorToComponent = async (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const rect = element.getBoundingClientRect();
			setPointerPosition({
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2,
			});
		}
		await sleep(moveSpeedInMs);
	};

	const highlightInput = async (id: string, value: any) => {
		if (value !== undefined && value !== null) {
			onUpdateInput(id, value);
		} else {
			const ref = buttonRefs.current[id];
			if (ref?.current) {
				ref.current.triggerAnimation();
			}
		}
	};

	const resetScene = () => {
		onResetInputs();
		setPointerPosition(null);
	};

	const enableUserInteraction = (value: boolean) => {
		document.body.style.pointerEvents = value ? "auto" : "none";
		setReplaying(!value);
	};

	const reenactSequence = async () => {
		enableUserInteraction(false);
		await sleep(moveSpeedInMs);
		resetScene();
		setPointerPosition({
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
		});
		await sleep(moveSpeedInMs);
		if (!sequence) return;
		for (let i = 0; i < sequence.getParts().length; i++) {
			const {id, expectedValue} = sequence.getParts()[i];
			await moveCursorToComponent(id);
			await highlightInput(id, expectedValue);
			await sleep(moveSpeedInMs);
		}
		await sleep(1000);
		resetScene();
		setPointerPosition(null);
		enableUserInteraction(true);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: Only want to run this when sequence changes
	useEffect(() => {
		if (sequence) {
			reenactSequence();
		}
	}, [sequence]);

	return {
		pointerPosition,
		replaying,
		buttonRefs,
	};
}
