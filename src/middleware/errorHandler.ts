import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../models/enum/httpError.enmu";

type CustomError = {
  message?: string;
  stack?: string;
} & ErrorRequestHandler;

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case HTTP_STATUS.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case HTTP_STATUS.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
    case HTTP_STATUS.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
    case HTTP_STATUS.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
    case HTTP_STATUS.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
      console.log("No Error, All good !");
      break;
  }
};

module.exports = errorHandler;
