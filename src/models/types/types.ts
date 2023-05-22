import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type Contact = {
  name: string;
  email: string;
  phone: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

export type AuthRequest = {
  user?: JwtPayload;
} & Request;
