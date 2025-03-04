import { Response } from "express";
import { Request as JwtRequest } from "express-jwt";
import PurchaseService from "./purchase.service";
import expressAsyncHandler from "express-async-handler";

export default class PurchaseController {
  private service: PurchaseService;

  constructor() {
    this.service = new PurchaseService();
  }

  createPurchase = expressAsyncHandler(
    async (req: JwtRequest, res: Response) => {
      const purchase = await this.service.createPurchase(
        req.body,
        req.auth?.id
      );
      res.status(201).json({
        message: "Purchase created successfully",
        data: purchase,
      });
    }
  );

  updatePurchase = expressAsyncHandler(
    async (req: JwtRequest, res: Response) => {
      const data = await this.service.updatePurchase(req.params.id, req.body);
      res.status(200).json({
        message: "Purchase successfully updated",
        data,
      });
    }
  );

  getPurchase = expressAsyncHandler(async (req: JwtRequest, res: Response) => {
    const data = await this.service.getPurchase(req.params.id);
    res.status(200).json({
      message: "Purchase successfully retrieved",
      data,
    });
  });

  getPurchases = expressAsyncHandler(async (req: JwtRequest, res: Response) => {
    const data = await this.service.getPurchases(req.query.page as any);
    res.status(200).json({
      message: "Purchases successfully retrieved",
      data,
    });
  });

  getLeaderboard = expressAsyncHandler(
    async (req: JwtRequest, res: Response) => {
      const data = await this.service.getLeaderboard();
      res.status(200).json({
        message: "Leaderboard successfully retrieved",
        data,
      });
    }
  );

  deletePurchase = expressAsyncHandler(
    async (req: JwtRequest, res: Response) => {
      await this.service.deletePurchase(req.params.id, req.auth?.id);
      res.status(200).json({
        message: "Purchase successfully deleted",
      });
    }
  );
}
