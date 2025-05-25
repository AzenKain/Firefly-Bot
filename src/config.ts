
import dotenv from "dotenv";

dotenv.config();

let { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_PREFIX } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID ) {
  throw new Error("Missing environment variables");
}
if (!DISCORD_PREFIX) {
  DISCORD_PREFIX = "f?";
}
export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_PREFIX,
};

