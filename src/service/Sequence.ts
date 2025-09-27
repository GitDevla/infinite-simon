import { SequencePart } from "./SequencePart";

export class Sequence {
    private currentPosition: number = 0;
    private parts: SequencePart[] = [];

    public addPart(part: SequencePart): void {
        this.parts.push(part);
    }

    public getCurrentPart(): SequencePart {
        return this.parts[this.currentPosition];
    }

    public moveToNextPart(): void {
        this.currentPosition++;
    }

    public reset(): void {
        this.currentPosition = 0;
    }

    public isComplete(): boolean {
        return this.currentPosition === this.parts.length
    }

    public getParts(): SequencePart[] {
        return this.parts;
    }
}