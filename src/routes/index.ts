import { Router } from "express";
import contactRouter from "@src/routes/contactRouter";
import userRouter from "@src/routes/userRouter";

const router = Router();

router.use("/api/contacts", contactRouter);
router.use("/api/users", userRouter);

export default router;
