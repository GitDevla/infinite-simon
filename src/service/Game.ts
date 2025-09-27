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
        switch (randomType) {
            case "button":
                this.sequence.addPart(new ButtonPart());
                break;
            case "slider":
                this.sequence.addPart(new SliderPart());
                break;
            case "knob":
                this.sequence.addPart(new KnobPart());
                break;
            case "switch":
                this.sequence.addPart(new SwitchPart());
                break;
            default:
                throw new Error("Uknown seqence part type")
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