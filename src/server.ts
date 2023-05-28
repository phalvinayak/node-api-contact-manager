import express, { Request, Response, Application } from "express";
import bodyParser from "body-parser";
import { PORT } from "@src/config/evn.config";
import router from "@src/routes";
import connectDb from "@src/config/dbConnection";
import errorHandler from "@src/middleware/errorHandler";

connectDb();
const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", router);
app.use(errorHandler);

app.get("/healthcheck", (_req: Request, res: Response): void => {
  res.sendStatus(200);
});

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
