import express, { Router } from "express";
import upload from "../config/handleFile";
import fileController from "../controller/fileController";
import { isAuthorized } from "../middleware/auth";

const routes: Router = express.Router();

routes.post(
  "/upload-file",
  upload.single("file"),
  isAuthorized,
  fileController.fileUpload
);
routes.post("/total-checkin", fileController.totalCheckIns);
routes.post("/total-late", fileController.totalLate);
routes.get("/get-dates/:id", fileController.getUniqueDates);
routes.get("/get-all-files", isAuthorized, fileController.fileHistory);
routes.delete("/delete-file/:id", isAuthorized, fileController.deleteFile);

export = routes;
