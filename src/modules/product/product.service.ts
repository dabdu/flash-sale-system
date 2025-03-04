import { Types } from "mongoose";
import {
  BadRequestException,
  NotFoundException,
} from "../../helpers/errorHandler";
import * as productInterface from "./product.interface";
import Product from "../../models/product.model";

export default class ProductService {
  /**
   * Creates a new product if it doesn't already exist.
   * @param body Product creation data.
   * @throws BadRequestException if a product with the same name already exists.
   *  @returns The newly created product.

   */
  public createProduct = async (
    body: productInterface.IProductCreate
  ): Promise<productInterface.IProduct & { _id: Types.ObjectId }> => {
    // Check if product already exists by name (or any unique field)
    const existingProduct = await Product.findOne({ name: body.name });
    if (existingProduct) {
      throw new BadRequestException("Product already exists");
    }
    const product = await Product.create(body);
    return product;
  };

  /**
   * Updates an existing product by ID.
   * @param id The product ID.
   * @param body The update data.
   * @returns The updated product.
   */
  public updateProduct = async (
    id: string,
    body: productInterface.IProductUpdate
  ): Promise<productInterface.IProduct & { _id: Types.ObjectId }> => {
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (!product) throw new NotFoundException("Product not found");
    return product;
  };

  /**
   * Retrieves a product by its ID.
   * @param id The product ID.
   * @returns The product.
   */
  public getProduct = async (
    id: string
  ): Promise<productInterface.IProduct & { _id: Types.ObjectId }> => {
    const product = await Product.findById(id);
    if (!product) throw new NotFoundException("Product not found");
    return product;
  };

  /**
   * Retrieves a paginated list of products.
   * @param page The page number (defaults to 1).
   * @returns An array of products.
   */
  public getProducts = async (
    page: number = 1
  ): Promise<(productInterface.IProduct & { _id: Types.ObjectId })[]> => {
    const limit = 10;
    const skip = (page - 1) * limit;
    return await Product.find().skip(skip).limit(limit);
  };

  /**
   * Deletes a product by its ID.
   * @param id The product ID.
   */
  public deleteProduct = async (id: string): Promise<void> => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new NotFoundException("Product not found");
  };
}
