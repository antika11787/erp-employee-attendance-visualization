import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
import { Multer } from "multer";
import { CustomRequest } from "../types/interface";

const fileTypes: string[] = [".xls", ".xlsx", ".xlsm", ".xlsb", "xltx"];

const upload: Multer = multer({
  limits: {
    fileSize: 25 * 1024 * 1024,
  },

  fileFilter: function (
    req: CustomRequest,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) {
    if (file) {
      const extension = path.extname(file.originalname);
      req.file_extension = extension;

      if (fileTypes.includes(extension)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    } else {
      callback(null, false);
    }
  },
});

export default upload;
