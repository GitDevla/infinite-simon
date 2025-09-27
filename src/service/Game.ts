import { ButtonPart, SliderPart, KnobPart, SwitchPart } from "./Parts";
import { Sequence } from "./Sequence";
import { SequencePart } from "./SequencePart";

export class Game {
    private static instance: Game = new Game();
    private sequence: Sequence = new Sequence();
    private currentRound: number = 1;
    private gameOver: boolean = false;
    private onNewRoundCallbacks: (() => void)[] = [];

    public startNewGame(): void {
        this.currentRound = 1;
        this.gameOver = false;
        this.sequence = new Sequence();
        this.generateNextSequance();
    }

    private generateNextSequance(): void {
        const types = ["button", "slider", "knob", "switch"];
        const randomType = types[Math.floor(Math.random() * types.length)];
        let nextPart: SequencePart;
        while (true) {
            switch (randomType) {
            case "button":
                nextPart = new ButtonPart();
                break;
            case "slider":
                nextPart = new SliderPart();
                break;
            case "knob":
                nextPart = new KnobPart();
                break;
            case "switch":
                nextPart = new SwitchPart();
                break;
            default:
                throw new Error("Unkown seqence part type")
            }

            const parts = this.sequence.getParts()

            // prevent game over on first switch false value
            if (nextPart.type === "switch" && nextPart.expectedValue === false && !this.sequence.getParts().some(part => part.id === nextPart.id)){
                continue;
            }
            
            // check for state change
            const lastSameId = parts.slice().reverse().find(part => part.id === nextPart.id)

            if (!lastSameId || lastSameId.expectedValue !== nextPart.expectedValue) {
                this.sequence.addPart(nextPart);
                break;
            }
        }
    }

    public checkPlayerInput(input: SequencePart): boolean {
        const currentPart = this.sequence.getCurrentPart();
        const expectedAction = currentPart.isCorrect(input);
        if (expectedAction) {
            this.sequence.moveToNextPart();
            if (this.sequence.isComplete()) {
                this.currentRound++;
                this.generateNextSequance();
                this.sequence.reset();
                this.onNewRoundCallbacks.forEach(cb => cb());
            }
        } else {
            this.gameOver = true;
        }

        return expectedAction;
    }

    public getCurrentRound(): number {
        return this.currentRound;
    }

    public isGameOver(): boolean {
        return this.gameOver;
    }

    public getSequence(): Sequence {
        const v = this.sequence;
        // Deep clone to prevent external mutations and ensure React detects changes
        return Object.assign(Object.create(Object.getPrototypeOf(v)), v);
    }

    public getInstance(): Game {
        return Game.instance;
    }

    public onNewRound(callback: () => void): void {
        this.onNewRoundCallbacks.push(callback);
    }
}