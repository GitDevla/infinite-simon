export class MockGame {
	private static instance: MockGame = new MockGame();

	public static getInstance(): MockGame {
		return MockGame.instance;
	}

	public getSequence(): any[] {
		return [
			{ type: "button", id: "simon-red" },
			{ type: "button", id: "simon-green" },
			{ type: "button", id: "simon-blue" },
			{ type: "button", id: "simon-yellow" },
			{ type: "switch", id: "switch-1", value: true },
			{ type: "switch", id: "switch-1", value: false },
			{ type: "switch", id: "switch-2", value: true },
			{ type: "slider", id: "slider-1", value: 1 },
			{ type: "knob", id: "knob-1", value: 2 },
			{ type: "knob", id: "knob-2", value: 4 },
		];
	}
}
