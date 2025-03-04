import { Response, Request } from "express";
import { Request as JwtRequest } from "express-jwt";
import UserService from "./user.service";
import expressAsyncHandler from "express-async-handler";

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  createUser = expressAsyncHandler(async (req: Request, res: Response) => {
    await this.service.createUser(req.body);
    res.status(201).json({
      message: "User created successfully",
    });
  });
  login = expressAsyncHandler(async (req: Request, res: Response) => {
    const user = await this.service.login(req.body);
    res.status(201).json({
      message: "User login successfully",
      user,
    });
  });

  getUser = expressAsyncHandler(async (req: JwtRequest, res: Response) => {
    const data = await this.service.getUser(req.params.id);
    res.status(200).json({
      message: "User successfully retrieved",
      data,
    });
  });

  getUsers = expressAsyncHandler(async (req: JwtRequest, res: Response) => {
    const data = await this.service.getUsers(req.query.page as any);
    res.status(200).json({
      message: "Users successfully retrieved",
      data,
    });
  });

  deleteUser = expressAsyncHandler(async (req: JwtRequest, res: Response) => {
    await this.service.deleteUser(req.params.id);
    res.status(200).json({
      message: "User successfully deleted",
    });
  });
}
