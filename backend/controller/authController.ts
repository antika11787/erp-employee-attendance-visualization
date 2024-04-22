import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthResponse } from "../types/interface";
const { appConfig } = require("../config/constant");

const authModel = require("../model/auth");
const userModel = require("../model/user");
const { success, failure } = require("../utils/successError");
const { validationResult } = require("express-validator");

class AuthController {
  async createValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return res
          .status(400)
          .send({ message: "Validation error", validation });
      }
      next();
    } catch (error) {
      console.log("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async signup(req: Request, res: Response): Promise<Response> {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).send({ message: "All fields are required" });
      }

      const existingUser = await authModel.findOne({ email });

      if (existingUser) {
        return res.status(400).send({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userModel.create({
        username,
        email,
      });
      await user.save();

      const auth = new authModel({
        username,
        email,
        password: hashedPassword,
        userID: user._id,
      });
      await auth.save();

      const responseAuth: AuthResponse = {
        ...auth.toObject(),
        password: undefined,
        __v: undefined,
      };

      return res.status(200).send(success("Sign up successful", responseAuth));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const auth = await authModel.findOne({ email });

      if (!auth) {
        return res.status(400).send({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, auth.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Invalid credentials" });
      }

      const responseAuth: AuthResponse = {
        ...auth.toObject(),
        password: undefined,
        __v: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };

      const generatedToken = jwt.sign(responseAuth, appConfig.jwtSecret!, {
        expiresIn: "30d",
      });

      responseAuth.token = generatedToken;

      return res.status(200).send(success("Login successful", responseAuth));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }
}

export default new AuthController();
