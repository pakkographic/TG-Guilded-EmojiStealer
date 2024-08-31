import type { ApplicationCommand, Client } from "touchguild";
import {ExtendedClient} from "./ExtendedClient";

export class InteractionBase {
    appCommand: ApplicationCommand;
    client: ExtendedClient;
    constructor(client: ExtendedClient, appCommand: ApplicationCommand) {
        this.client = client;
        this.appCommand = appCommand;
    }

    run(...args: Array<any>): void {
        return void new Error("Run command has been executed without being overridden.");
    }
}
