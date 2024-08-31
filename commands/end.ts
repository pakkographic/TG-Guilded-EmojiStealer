import { InteractionBase } from "../structures/InteractionBase";
import { type ExtendedClient } from "../structures/ExtendedClient";
import { type AnyTextableChannel, ApplicationCommandType, type CommandInteraction } from "touchguild";

export default class end extends InteractionBase {
    constructor(client: ExtendedClient) {
        super(client,{
            name: "end",
            type: ApplicationCommandType.CHAT_INPUT
        });
    }

    override async run(interaction: CommandInteraction<AnyTextableChannel>): Promise<void> {
        if (!this.client.activeStealerIDs.includes(interaction.memberID))
            return void interaction.createMessage({
                content: "You didn't even start stealing, wdym?"
            });
        this.client.activeStealerIDs =
            this.client.activeStealerIDs.filter(id => id !== interaction.memberID);
        return void interaction.createMessage({
            content: "Bravo! You ended the stealing process."
        });
    }
}
