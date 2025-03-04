import { Response } from "express";
import { Request as JwtRequest } from "express-jwt";
import ProductService from "./product.service";
import expressAsyncHandler from "express-async-handler";

export default class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  createProduct = expressAsyncHandler(
    async (req: JwtRequest, res: Response) => {
      const product = await this.service.createProduct(req.body);
      res.status(201).json({
        message: "Product created successfully",
        data: product,
      });
    }
  );

  updateProduct = expressAsyncHandler(
    async (req: JwtRequest, res: Response) => {
      const product = await this.service.updateProduct(req.params.id, req.body);
      res.status(200).json({
        message: "Product successfully updated",
        data: product,
      });
    }
  );

  getProduct = expressAsyncHandler(async (req: JwtRequest, res: Response) => {
    const product = await this.service.getProduct(req.params.id);
    res.status(200).json({
      message: "Product successfully retrieved",
      data: product,
    });
  });

  getProducts = expressAsyncHandler(async (req: JwtRequest, res: Response) => {
    const product = await this.service.getProducts(req.query.page as any);
    res.status(200).json({
      message: "Products successfully retrieved",
      data: product,
    });
  });

  deleteProduct = expressAsyncHandler(
    async (req: JwtRequest, res: Response) => {
      await this.service.deleteProduct(req.params.id);
      res.status(200).json({
        message: "Product successfully deleted",
      });
    }
  );
}
