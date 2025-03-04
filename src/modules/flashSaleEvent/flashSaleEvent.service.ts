import { Types } from "mongoose";
import Product from "../../models/product.model";
import FlashSaleEvent from "../../models/flashShareEvent.model";
import {
  BadRequestException,
  NotFoundException,
} from "../../helpers/errorHandler";
import * as flashSaleEventInterface from "./flashSaleEvent.interface";

export default class FlashSaleEventService {
  /**
   * Creates a new flash sale event.
   * Validates the provided product ID and checks if the product exists.
   * Also ensures there is no overlapping flash sale for the same product.
   *
   * @param body - Contains product (as a string), allocatedUnits, saleStart, and saleEnd.
   * @returns The created flash sale event, populated with product details.
   * @throws BadRequestException if the product ID is invalid, the product doesn't exist,
   *         or if an overlapping flash sale exists.
   */
  public createFlashSaleEvent = async (
    body: flashSaleEventInterface.IFlashSaleEventCreate
  ): Promise<flashSaleEventInterface.IFlashSaleEvent> => {
    // Validate that the product ID is a valid ObjectId.
    if (!Types.ObjectId.isValid(body.product)) {
      throw new BadRequestException("Invalid product ID");
    }

    // Verify the product exists.
    const productExists = await Product.findById(body.product);
    if (!productExists) {
      throw new BadRequestException("Product not found");
    }

    // Check if there's any overlapping flash sale for this product.
    const overlappingSale = await FlashSaleEvent.findOne({
      product: body.product,
      saleEnd: { $gte: body.saleStart }, // Existing sale ends after new sale starts
      saleStart: { $lte: body.saleEnd }, // Existing sale starts before new sale ends
    });
    if (overlappingSale) {
      throw new BadRequestException(
        "A flash sale event for this product already exists during the specified time period"
      );
    }

    // Create the flash sale event; initialize remainingUnits equal to allocatedUnits.
    const flashSaleEvent = await FlashSaleEvent.create({
      ...body,
      remainingUnits: body.allocatedUnits,
    });

    // Populate product details before returning.
    const populatedEvent = await FlashSaleEvent.findById(
      flashSaleEvent._id
    ).populate("product");
    if (!populatedEvent) {
      throw new NotFoundException("Flash sale event not found after creation");
    }
    return populatedEvent;
  };

  /**
   * Updates an existing flash sale event by ID.
   *
   * @param id - The flash sale event ID.
   * @param body - Data to update.
   * @returns The updated flash sale event, populated with product details.
   * @throws NotFoundException if the event is not found.
   */
  public updateFlashSaleEvent = async (
    id: string,
    body: Partial<{
      product: string;
      allocatedUnits: number;
      saleStart: Date;
      saleEnd: Date;
    }>
  ): Promise<flashSaleEventInterface.IFlashSaleEvent> => {
    const updatedEvent = await FlashSaleEvent.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    ).populate("product");
    if (!updatedEvent)
      throw new NotFoundException("Flash sale event not found");
    return updatedEvent;
  };

  /**
   * Retrieves a flash sale event by its ID.
   *
   * @param id - The flash sale event ID.
   * @returns The flash sale event, populated with product details.
   * @throws NotFoundException if the event is not found.
   */
  public getFlashSaleEvent = async (
    id: string
  ): Promise<flashSaleEventInterface.IFlashSaleEvent> => {
    const event = await FlashSaleEvent.findById(id).populate("product");
    if (!event) throw new NotFoundException("Flash sale event not found");
    return event;
  };

  /**
   * Retrieves a paginated list of active flash sale events.
   *
   * The flash sale is time-restricted:
   * - It begins at a specific, predefined time.
   * - It continues until all units are sold out.
   * - It can restart multiple times within a month.
   *
   * Only flash sale events where the current (adjusted) time is between saleStart and saleEnd are returned.
   *
   * @param page - The page number (defaults to 1).
   * @returns An array of flash sale events, each populated with product details.
   */
  public getFlashSaleEvents = async (
    page: number = 1
  ): Promise<flashSaleEventInterface.IFlashSaleEvent[]> => {
    const limit = 10;
    const skip = (page - 1) * limit;
    const now = new Date();
    // Adjust current time by adding one hour to account for timezone differences
    const adjustedNow = new Date(now.getTime() + 60 * 60 * 1000);

    return await FlashSaleEvent.find({
      saleStart: { $lte: adjustedNow },
      saleEnd: { $gte: adjustedNow },
    })
      .skip(skip)
      .limit(limit)
      .populate("product");
  };

  /**
   * Deletes a flash sale event by its ID.
   *
   * @param id - The flash sale event ID.
   * @throws NotFoundException if the event is not found.
   */
  public deleteFlashSaleEvent = async (id: string): Promise<void> => {
    const event = await FlashSaleEvent.findByIdAndDelete(id);
    if (!event) throw new NotFoundException("Flash sale event not found");
  };
}
