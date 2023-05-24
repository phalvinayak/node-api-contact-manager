import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "@src/models/schema/userModel";
import { AuthRequest, User } from "@src/models/types/types";
import { ACCESS_TOKEN_SECRET } from "@src/config/evn.config";

// @desc Register User
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All the fields are mandatory");
  }

  const userAvailable = await UserModel.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered with this email");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc Login User
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const user = (await UserModel.findOne({ email })) as User;
  // Compare Password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password not valid!");
  }
});

// @desc Current User
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.json(req.user);
});

export { registerUser, loginUser, currentUser };
