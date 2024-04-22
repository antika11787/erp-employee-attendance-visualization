import express, { Router } from "express";
import AuthController from "../controller/authController";
import { authValidators } from "../middleware/validation";

const routes: Router = express.Router();

routes.post(
  "/signup",
  authValidators.signup,
  AuthController.createValidation,
  AuthController.signup
);
routes.post("/login", AuthController.login);

export = routes;
