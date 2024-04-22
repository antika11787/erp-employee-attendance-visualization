import { Document, Types } from "mongoose";
import { Request } from "express";

interface CustomRequest extends Request {
  file_extension?: string;
}

interface FileResponse {
  employee: String;
  employee_id: String;
  check_in?: String;
  check_out?: String;
  worked_hours: Number;
  late_hours: Number;
  early_leave_hours: Number;
  over_time: Number;
}

interface IFile extends Document {
  file_name: string;
  file: FileResponse[];
  size: number;
}

interface ITotal extends Document {
  total: string;
}

interface FileResponseRaw {
  Employee: String;
  "Employee ID": String;
  "Check In"?: String;
  "Check Out"?: String;
  "Worked Hours (H.M)": Number;
  "Late Hours (H.M)": Number;
  "Early Leave Hours (H.M)": Number;
  "Over Time (H.M)": Number;
}

interface FilterType {
  price?: { $gte?: number | undefined; $lte?: number | undefined } | undefined;
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}

interface IAuth extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  userID: Types.ObjectId;
}

interface IUser extends Document {
  username: string;
  email: string;
  role: string;
}

interface AuthResponse {
  username: string;
  email: string;
  userId: string;
  token?: string;
}

interface IAuthMiddleware extends Request {
  user: IAuth;
}

export {
  CustomRequest,
  IFile,
  FileResponse,
  FileResponseRaw,
  ITotal,
  FilterType,
  IAuth,
  IUser,
  AuthResponse,
  IAuthMiddleware,
};
