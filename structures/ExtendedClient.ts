import { type InteractionBase } from "./InteractionBase";
import { type EventBase } from "./EventBase";
import { type AnyReactionInfo, Client, type ClientEvents, type ClientOptions } from "touchguild";
import { type Class } from "type-fest";
import * as fs from "node:fs";

export class ExtendedClient extends Client {
    activeStealerIDs: Array<string>;
    basePath: string;
    commands: Map<string, InteractionBase>;
    stolenReactionMap: Map<string, Array<AnyReactionInfo>>;
    constructor(options: ClientOptions & { basePath: string; }) {
        super(options);
        this.basePath = options.basePath;
        this.commands = new Map();
        this.stolenReactionMap = new Map();
        this.activeStealerIDs = [];
        void this.registerEvents();
    }

    async registerEvents(): Promise<void> {
        const eventFileNames = fs.readdirSync(this.basePath + "/events");
        for (const name of eventFileNames) {
            const event: { default: Class<EventBase>; } = await import("../events/" + name);
            const constructedEvent = new (event.default)(this);
            this[constructedEvent.type](name.split(".")[0] as keyof ClientEvents, (...args): void =>
                constructedEvent.run(...args)
            );
        }
        console.log("Events have been successfully loaded.");
    }
}
