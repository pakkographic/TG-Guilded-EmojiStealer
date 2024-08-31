import { InteractionBase } from "../structures/InteractionBase";
import { type ExtendedClient } from "../structures/ExtendedClient";
import { type AnyTextableChannel, ApplicationCommandType, type CommandInteraction } from "touchguild";

export default class help extends InteractionBase {
    constructor(client: ExtendedClient) {
        super(client,{
            name: "help",
            type: ApplicationCommandType.CHAT_INPUT
        });
    }

    override async run(interaction: CommandInteraction<AnyTextableChannel>): Promise<void> {
        void interaction.createMessage({
            embeds: [{
                title: "How to steal emojis?",
                description:
                    "Fellow robber, you have to start the robbery by using `/stealer start`, " +
                    "react to a message with the reaction you want to steal, " +
                    "it will send the link of the reaction in the channel.\n" +
                    "To end the stealing process, use `/stealer end`." +
                    "\n\n**[Open-Source](https://github.com/pakkographic/TG-Guilded-EmojiStealer) & Made with [TouchGuild](https://touchguild.com/).**"
            }]
        });
    }
}
