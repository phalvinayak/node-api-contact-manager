import {
  currentUser,
  loginUser,
  registerUser,
} from "@controllers/userController";
import validateToken from "@middleware/validateToken";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/current", validateToken, currentUser);

export default userRouter;
