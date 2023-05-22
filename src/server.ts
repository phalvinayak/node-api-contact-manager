import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import { PORT } from "./config/evn.config";
import router from "./routes";
import connectDb from "./config/dbConnection";

connectDb();
const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.get("/", (_req: Request, res: Response): void => {
  res
    .status(200)
    .json({ message: "Hello Typescript with Node.js! with live changes" });
});

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
