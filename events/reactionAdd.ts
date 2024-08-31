import { EventBase } from "../structures/EventBase";
import { type ExtendedClient } from "../structures/ExtendedClient";
import { type AnyReactionInfo } from "touchguild";

export default class reactionAdd extends EventBase {
    client: ExtendedClient;
    constructor(client: ExtendedClient) {
        super("on");
        this.client = client;
    }

    override async run(reactionInfo: AnyReactionInfo): Promise<void> {
        if (!this.client.activeStealerIDs.includes(reactionInfo.reactorID)) return;
        const userReactionArray: Array<AnyReactionInfo> = this.client.stolenReactionMap.get(reactionInfo.reactorID) ?? [];
        await this.client.rest.channels.createMessage(
            reactionInfo.channelID,
            {
                content:               "Emoji name: " + reactionInfo.emoji.name + ", URL: " + reactionInfo.emoji.url,
                hiddenLinkPreviewURLs: [reactionInfo.emoji.url]
            }
        );
        this.client.stolenReactionMap.set(reactionInfo.reactorID, userReactionArray);
    }
}

