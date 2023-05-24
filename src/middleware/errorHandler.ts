import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "@src/models/enum/httpError.enmu";

type CustomError = {
  message?: string;
  stack?: string;
} & ErrorRequestHandler;

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  let title: string = "";
  let exception: boolean = true;
  switch (statusCode) {
    case HTTP_STATUS.VALIDATION_ERROR:
      title = "Validation Failed";
      break;
    case HTTP_STATUS.NOT_FOUND:
      title = "Not Found";
      break;
    case HTTP_STATUS.UNAUTHORIZED:
      title = "Unauthorized";
      break;
    case HTTP_STATUS.FORBIDDEN:
      title = "Forbidden";
      break;
    case HTTP_STATUS.SERVER_ERROR:
      title = "Server Error";
      break;
    default:
      exception = false;
      next();
      break;
  }
  if (exception) {
    res.json({
      title,
      message: err.message,
      stackTrace: err.stack,
    });
  }
};

export default errorHandler;
