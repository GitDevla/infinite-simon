export abstract class SequencePart{
    public type: string;
    public expectedValue: any;

    constructor(type: string, exectedValue: any){
        this.type = type;
        this.expectedValue = exectedValue;
    }

    public abstract isCorrect(input: any): boolean;
}