import * as dotenv from "dotenv";
dotenv.config();

export const PORT: string = process.env.PORT || "8080";
export const CONNECTION_URL: string = process.env.CONNECTION_URL || "";
export const ACCESS_TOKEN_SECRET: string =
  process.env.ACCESS_TOKEN_SECRET || "";
