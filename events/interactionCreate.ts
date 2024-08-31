import { EventBase } from "../structures/EventBase";
import { type ExtendedClient } from "../structures/ExtendedClient";
import { type AnyTextableChannel, type CommandInteraction } from "touchguild";

export default class interactionCreate extends EventBase {
    client: ExtendedClient;
    constructor(client: ExtendedClient) {
        super("on");
        this.client = client;
    }

    override async run(interaction: CommandInteraction<AnyTextableChannel>): Promise<void> {
        this.client.commands.get(interaction.data.name)?.run(interaction);
    }
}

