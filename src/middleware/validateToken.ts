import { ACCESS_TOKEN_SECRET } from "@config/evn.config";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = getAuthToken(req);
    if (token) {
      jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error(`User is not authorized ${err.message}`);
        }
        if (typeof decoded === "object") {
          // console.log(decoded);
          res.locals.user = decoded.user;
          next();
        } else {
          res.status(401);
          throw new Error("Invalid Token");
        }
      });
    } else {
      res.status(401);
      throw new Error("Token is missing");
    }
  }
);

export default validateToken;

const getAuthToken = (req: Request): string | null => {
  let authHeader: string | undefined;
  let token: string | null = null;
  const auth = req.headers.Authorization || req.headers.authorization;
  authHeader = Array.isArray(auth) ? auth[0] : auth;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  return token;
};
