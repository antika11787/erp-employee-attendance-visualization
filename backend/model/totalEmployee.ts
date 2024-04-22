import { Schema, model } from "mongoose";
import { ITotal } from "../types/interface";

const totalEmployeeSchema = new Schema<ITotal>({
  total: String,
});

const totalEmployee = model<ITotal>("totalEmployee", totalEmployeeSchema);
module.exports = totalEmployee;
