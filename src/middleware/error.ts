import { HttpException } from "@/error/http";
import { NextFunction, Request, Response } from "express";

export const errorMiddlware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  try {
    const isHttpException = error.statusCode != undefined;
    if (isHttpException) {
      return res
        .send({
          statusCode: error.statusCode,
          message: error.message,
        })
        .status(error.statusCode);
    }

    return res
      .send({
        statusCode: 500,
        message: error.message,
      })
      .status(500);
  } catch (err) {
    return res
      .send({
        statusCode: 500,
        message: "INTERNAL SERVER ERROR",
      })
      .status(500);
  }
};
