import { Router } from "express";
import contactRouter from "./contactRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/api/contacts", contactRouter);
router.use("/api/users", userRouter);

export default router;
