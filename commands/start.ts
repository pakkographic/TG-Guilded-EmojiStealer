import { InteractionBase } from "../structures/InteractionBase";
import { type ExtendedClient } from "../structures/ExtendedClient";
import { type AnyTextableChannel, ApplicationCommandType, type CommandInteraction } from "touchguild";

export default class start extends InteractionBase {
    constructor(client: ExtendedClient) {
        super(client,{
            name: "start",
            type: ApplicationCommandType.CHAT_INPUT
        });
    }

    override async run(interaction: CommandInteraction<AnyTextableChannel>): Promise<void> {
        if (this.client.activeStealerIDs.includes(interaction.memberID))
            return void interaction.createMessage({
                content: "You already started stealing! Add any reaction to a message to steal them!"
            });
        this.client.activeStealerIDs.push(interaction.memberID);
        return void interaction.createMessage({
            content:
                "Let's start stealing! Stealing mode enabled, " +
                "get started by adding any reaction to a message to steal 'em."
        });
    }
}
