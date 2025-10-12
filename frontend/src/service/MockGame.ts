export class MockGame {
	private static instance: MockGame = new MockGame();

	private sequence: any[] = [
		{type: "button", id: "simon-red"},
		{type: "button", id: "simon-green"},
		{type: "button", id: "simon-blue"},
		{type: "button", id: "simon-yellow"},
		{type: "switch", id: "switch-1", value: true},
		{type: "switch", id: "switch-1", value: false},
		{type: "switch", id: "switch-2", value: true},
		{type: "slider", id: "slider-1", value: 1},
		{type: "knob", id: "knob-1", value: 2},
		{type: "knob", id: "knob-2", value: 4},
	];
	private currentPosition: number = 0;
	private round: number = 0;

	public static getInstance(): MockGame {
		return MockGame.instance;
	}

	public getSequence(): any[] {
		return this.sequence.slice(0, this.round + 1);
	}

	public validateUserAction(action: string): boolean {
		console.log("Validating action:", action);
		const expectedAction = this.sequence[this.currentPosition];
		console.log("Expected action:", expectedAction);
		if (!expectedAction) return false;

		let isValid = false;
		const [actionId, actionValue] = action.split(":");

		if (expectedAction.id === actionId) {
			if (expectedAction.value !== undefined) {
				isValid = expectedAction.value.toString() === actionValue;
			} else {
				isValid = true;
			}
		}

		console.log("Action valid:", isValid);

		if (isValid) {
			this.currentPosition++;
		}

		return isValid;
	}

	public isEndOfSequence(): boolean {
		return this.currentPosition > this.round;
	}

	public nextRound(): void {
		this.round++;
		this.currentPosition = 0;
	}
}
