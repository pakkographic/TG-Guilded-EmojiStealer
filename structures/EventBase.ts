
export class EventBase {
    type: "on" | "once";
    constructor(type: "on" | "once") {
        this.type = type;
    }

    run(...args: Array<any>): void {
        return void new Error("Run event has been executed without being overridden.");
    }
}
