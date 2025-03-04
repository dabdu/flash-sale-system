import _ from "lodash";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import {
  BadRequestException,
  NotFoundException,
} from "../../helpers/errorHandler";
import * as userInterface from "./user.interface";
import User from "../../models/user.model";

export default class UserService {
  public createUser = async (
    body: userInterface.IAuthUser
  ): Promise<string> => {
    const { email, password } = body;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequestException("User already exist");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ email, password: hashedPassword });
    return "User Created Successfully";
  };

  public login = async (
    body: userInterface.IAuthUser
  ): Promise<{
    token: string;
    user: userInterface.IUser & { _id: Types.ObjectId };
  }> => {
    const { email, password } = body;
    const user: any = await User.findOne({ email: email?.toLowerCase() });
    if (!user) throw new NotFoundException("Incorrect email or password");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new BadRequestException("Incorrect email or password");

    // Remove the password field using lodash omit function
    const userWithoutPassword: any = _.omit(user.toJSON(), "password");

    const token = jwt.sign(
      userWithoutPassword,
      process.env.JWT_SECRET as string
    );
    return {
      token,
      user: userWithoutPassword,
    };
  };

  public getUser = async (
    userId: string
  ): Promise<userInterface.IUser & { _id: Types.ObjectId }> => {
    const user = await User.findById(userId).select("-password");
    if (!user) throw new NotFoundException("User not found");
    return user;
  };

  public getUsers = async (
    page: number = 1
  ): Promise<(userInterface.IUser & { _id: Types.ObjectId })[]> => {
    const limit = 10;
    const skip = (page - 1) * limit;
    return await User.find().select("-password").skip(skip).limit(limit);
  };

  public deleteUser = async (id: string): Promise<void> => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new NotFoundException("User not found");
  };
}
