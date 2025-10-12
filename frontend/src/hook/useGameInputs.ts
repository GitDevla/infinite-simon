import {useEffect, useState} from "react";
import type {GameInput} from "../page/GameScreen";
import type {Sequence} from "../service/Sequence";

export function useGameInputs(sequence: Sequence | null) {
	const [inputs, setInputs] = useState<GameInput[]>([]);
	const [forceUpdate, setForceUpdate] = useState(0);

	useEffect(() => {
		setInputs(prev => {
			if (!sequence) return prev;
			// Always have the 4 default buttons
			const defaults = [
				{type: "button", id: "simon-red"},
				{type: "button", id: "simon-green"},
				{type: "button", id: "simon-blue"},
				{type: "button", id: "simon-yellow"},
			] as GameInput[];
			for (const input of sequence.getParts()) {
				if (!defaults.find(d => d.id === input.id))
					defaults.push({
						type: input.type,
						id: input.id,
						value: 0,
					});
			}
			return defaults;
		});
	}, [sequence]);

	const resetInputs = () => {
		setInputs(prev =>
			prev.map(input => {
				if (input.type === "switch") return {...input, value: false};
				if (input.type === "knob") return {...input, value: 0};
				if (input.type === "slider") return {...input, value: 0};
				return input;
			}),
		);
		setForceUpdate(f => f + 1);
	};

	const updateInput = (id: string, value: any) => {
		setInputs(prev => prev.map(input => (input.id === id ? {...input, value: value} : input)));
	};

	const enabledButtons = inputs.filter(input => input.type === "button");
	const enabledSliders = inputs.filter(input => input.type === "slider");
	const enabledSwitches = inputs.filter(input => input.type === "switch");
	const enabledKnobs = inputs.filter(input => input.type === "knob");

	return {
		inputs,
		forceUpdate,
		resetInputs,
		updateInput,
		enabledButtons,
		enabledSliders,
		enabledSwitches,
		enabledKnobs,
	};
}
