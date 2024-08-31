// Imports
import { ExtendedClient } from "./structures/ExtendedClient";
import { config as configDotEnv } from "dotenv";

configDotEnv(); // configure .env file to make it usable

const client = new ExtendedClient({
    token:                process.env.TOKEN ?? "no .env token",
    // will be used for commands (e.g: /myapp command)
    applicationShortname: "stealer",
    basePath:             __dirname
});

client.connect();
