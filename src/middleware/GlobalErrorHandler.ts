import type { ErrorRequestHandler } from "express";
import AppError from "../utils/AppError";
import config from "../config";

const GlobalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something Went Wrong!";
  let errorSources;

  //   if (err instanceof ZodError) {
  //     const simplifiedError = handleZodHandler(err)
  //     statusCode = simplifiedError.statusCode
  //     message = simplifiedError.message
  //     errorSources = simplifiedError.errorSources
  //   }

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    // errorSources,
    errors: config.node_env === "development" ? err.stack : null,
  });
};

export default GlobalErrorHandler;
