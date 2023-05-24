import { ACCESS_TOKEN_SECRET } from "@src/config/evn.config";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "@src/models/types/types";

const validateToken = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token = getAuthToken(req);
    if (token) {
      jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error(`User is not authorized ${err.message}`);
        }
        if (typeof decoded === "object") {
          // console.log(decoded);
          req.user = decoded.user;
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
