import { Schema, model, Types } from "mongoose";
import { IAuth } from "../types/interface";

const authSchema = new Schema<IAuth>(
  {
    username: {
      type: String,
      maxLength: 50,
      unique: true,
      required: [true, "Username should be provided"],
    },
    email: {
      type: String,
      maxLength: 100,
      unique: true,
      required: [true, "Email should be provided"],
    },
    password: {
      type: String,
      required: [true, "Password should be provided"],
    },
    role: {
      type: String,
      required: true,
      default: "admin",
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Auth = model<IAuth>("Auth", authSchema);
module.exports = Auth;
