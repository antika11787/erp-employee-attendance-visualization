import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IAuthMiddleware } from "../types/interface";
const { handleJSONTokenError } = require("../utils/errorHandler");
const { appConfig } = require("../config/constant");

const { failure } = require("../utils/successError");

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).send(failure("Authorization failed!"));
    }
    const token = req.headers.authorization?.split(" ")[1] ?? "";

    const decoded: any = jwt.verify(token, appConfig.jwtSecret!);

    if (!decoded) {
      return res.status(400).send(failure("Authorization failed!"));
    }

    const customRequest = req as IAuthMiddleware;
    customRequest.user = decoded;
    next();
  } catch (error) {
    console.log("error found", error);
    handleJSONTokenError(error, req, res, next);
    return res.status(500).send(failure("Internal server error"));
  }
};

export { isAuthorized };
