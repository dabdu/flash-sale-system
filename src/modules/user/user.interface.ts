import { Document } from "mongoose";

/**
 * --------------------------
 * User Interfaces
 * --------------------------
 */

// interface is used with Mongoose models
export interface IUser extends Document {
  email: string;
  password: string;
  userType: string;
}

// Interface for user authentication (Login and Register)
export interface IAuthUser {
  email: string;
  password: string;
}

// Interface for updating a user (all fields are optional)
export interface IUserUpdate {
  email?: string;
  password?: string;
}
