// Imports
import { ExtendedClient } from "./structures/ExtendedClient";
import { config as configDotEnv } from "dotenv";
import { GatewayLayerIntent } from "touchguild";

configDotEnv(); // configure .env file to make it usable

const client = new ExtendedClient({
    token:                process.env.TOKEN ?? "no .env token",
    // will be used for commands (e.g: /myapp command)
    applicationShortname: "stealer",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    intents:              [GatewayLayerIntent.ALL],
    basePath:             __dirname
});

client.connect();
