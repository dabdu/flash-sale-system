import { Schema, model } from "mongoose";
import { IUser } from "../modules/user/user.interface";
const User = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
export default model<IUser>("User", User);
