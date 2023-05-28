import { Router } from "express";
import contactRouter from "@src/routes/contactRouter";
import userRouter from "@src/routes/userRouter";

const router = Router();

router.use("/contacts", contactRouter);
router.use("/users", userRouter);

export default router;
