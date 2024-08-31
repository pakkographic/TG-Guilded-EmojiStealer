import { EventBase } from "../structures/EventBase";
import { type ExtendedClient } from "../structures/ExtendedClient";
import type { InteractionBase } from "../structures/InteractionBase";
import type { Class } from "type-fest";
import fs from "node:fs";

export default class ready extends EventBase {
    client: ExtendedClient;
    constructor(client: ExtendedClient) {
        super("once");
        this.client = client;
    }

    override async run(): Promise<void> {
        console.log(this.client.user?.username + " is ready!");
        const commandFileNames = fs.readdirSync(this.client.basePath + "/commands");
        for (const nameWithExtension of commandFileNames) {
            const command: { default: Class<InteractionBase>; } = await import("../commands/" + nameWithExtension);
            const name = nameWithExtension.split(".")[0];
            const constructedCommand = new (command.default)(this.client);
            this.client.commands.set(name, constructedCommand);
            this.client.registerGlobalApplicationCommand(constructedCommand.appCommand);
        }
        console.log("Commands have been successfully registered & loaded.");
    }
}
