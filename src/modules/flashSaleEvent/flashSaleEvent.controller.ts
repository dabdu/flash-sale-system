import { Response } from "express";
import { Request as JwtRequest } from "express-jwt";
import FlashSaleEventService from "./flashSaleEvent.service";
import expressAsyncHandler from "express-async-handler";

export default class FlashSaleEventController {
  private service: FlashSaleEventService;

  constructor() {
    this.service = new FlashSaleEventService();
  }

  createFlashSaleEvent = expressAsyncHandler(
    async (req: JwtRequest, res: Response) => {
      const sale = await this.service.createFlashSaleEvent(req.body);
      res.status(201).json({
        message: "Flash sale event created successfully",
        data: sale,
      });
    }
  );

  updateFlashSaleEvent = expressAsyncHandler(
    async (req: JwtRequest, res: Response) => {
      const data = await this.service.updateFlashSaleEvent(
        req.params.id,
        req.body
      );
      res.status(200).json({
        message: "Flash sale event successfully updated",
        data,
      });
    }
  );

  getFlashSaleEvent = expressAsyncHandler(
    async (req: JwtRequest, res: Response) => {
      const data = await this.service.getFlashSaleEvent(req.params.id);
      res.status(200).json({
        message: "Flash sale event successfully retrieved",
        data,
      });
    }
  );

  getFlashSaleEvents = expressAsyncHandler(
    async (req: JwtRequest, res: Response) => {
      const data = await this.service.getFlashSaleEvents(req.query.page as any);
      res.status(200).json({
        message: "Flash sale events successfully retrieved",
        data,
      });
    }
  );

  deleteFlashSaleEvent = expressAsyncHandler(
    async (req: JwtRequest, res: Response) => {
      await this.service.deleteFlashSaleEvent(req.params.id);
      res.status(200).json({
        message: "Flash sale event successfully deleted",
      });
    }
  );
}
