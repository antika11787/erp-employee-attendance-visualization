import { Schema, model } from "mongoose";
import { IFile } from "../types/interface";

const fileUploadSchema = new Schema<IFile>(
  {
    file_name: { type: String, required: true },
    file: [
      {
        employee: String,
        employee_id: String,
        check_in: String,
        check_out: String,
        worked_hours: Number,
        late_hours: Number,
        early_leave_hours: Number,
        over_time: Number,
      },
    ],
    size: { type: Number, required: true },
  },
  { timestamps: true }
);

const FileUpload = model<IFile>("file", fileUploadSchema);
module.exports = FileUpload;
