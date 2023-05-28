import * as dotenv from "dotenv";
dotenv.config();

export const PORT: number = <number>(process.env.PORT || 5001);
export const CONNECTION_URL: string = process.env.CONNECTION_URL || "";
export const ACCESS_TOKEN_SECRET: string =
  process.env.ACCESS_TOKEN_SECRET || "";
export const ACCESS_TOKEN_TTL: string = process.env.ACCESS_TOKEN_TTL || "1h";
