import { Types } from "mongoose";
import {
  BadRequestException,
  NotFoundException,
} from "../../helpers/errorHandler";
import FlashSaleEvent from "../../models/flashShareEvent.model";
import Purchase from "../../models/purchase.model";
import * as purchaseInterface from "./purchase.interface";

export default class PurchaseService {
  /**
   * Creates a new purchase.
   * Validates that the flash sale event is active (using an adjusted time with a one-hour offset),
   * checks that sufficient stock exists, and prevents purchases exceeding the allowed quantity per transaction.
   * check if user already purchase the flash sale, user cannot purchase more than one flash sale
   *
   * @param body - Contains the flash sale event ID and quantity to purchase.
   * @param userId - The ID of the user making the purchase.
   * @returns The created purchase record.
   * @throws BadRequestException if the event is invalid, not active, insufficient stock,
   *         or if the purchase exceeds the allowed quantity per transaction.
   */
  public createPurchase = async (
    body: purchaseInterface.IPurchaseCreate,
    userId: string
  ): Promise<purchaseInterface.IPurchase> => {
    // Validate flash sale event ID.
    if (!Types.ObjectId.isValid(body.flashSaleEvent)) {
      throw new BadRequestException("Invalid flash sale event ID");
    }

    // Retrieve the flash sale event.
    const saleEvent = await FlashSaleEvent.findById(body.flashSaleEvent);
    if (!saleEvent) {
      throw new NotFoundException("Flash sale event not found");
    }

    // Check if the same user already has a purchase for this flash sale event.
    const existingPurchase = await Purchase.findOne({
      flashSaleEvent: saleEvent._id,
      user: userId,
    });
    if (existingPurchase) {
      throw new BadRequestException(
        "User has already purchased in this flash sale event"
      );
    }

    // Adjust current time by adding one hour.
    const now = new Date();
    const adjustedNow = new Date(now.getTime() + 60 * 60 * 1000);

    // Ensure the flash sale is active.
    if (saleEvent.saleStart > adjustedNow) {
      throw new BadRequestException("Flash sale has not started yet");
    }
    if (saleEvent.saleEnd < adjustedNow) {
      throw new BadRequestException("Flash sale has ended");
    }

    // Prevent purchasing more than the allowed quantity per transaction.
    const MAX_QUANTITY_PER_TRANSACTION = 5; // Customize this limit as needed.
    if (body.quantity > MAX_QUANTITY_PER_TRANSACTION) {
      throw new BadRequestException(
        `You cannot purchase more than ${MAX_QUANTITY_PER_TRANSACTION} units per transaction`
      );
    }

    // Check for sufficient stock.
    if (saleEvent.remainingUnits < body.quantity) {
      throw new BadRequestException("Insufficient stock available");
    }

    // Atomically decrement the remaining stock.
    const updatedSaleEvent = await FlashSaleEvent.findOneAndUpdate(
      {
        _id: saleEvent._id,
        remainingUnits: { $gte: body.quantity },
      },
      { $inc: { remainingUnits: -body.quantity } },
      { new: true }
    );
    if (!updatedSaleEvent) {
      throw new BadRequestException("Purchase failed due to stock issues");
    }

    // Create the purchase record.
    const purchase = await Purchase.create({
      user: userId,
      flashSaleEvent: saleEvent._id,
      quantity: body.quantity,
      purchaseTime: new Date(),
    });

    return purchase;
  };

  /**
   * Updates a purchase record by its ID.
   *
   * @param id - The purchase record ID.
   * @param body - The fields to update.
   * @returns The updated purchase record.
   * @throws NotFoundException if the purchase is not found.
   */
  public updatePurchase = async (
    id: string,
    body: Partial<purchaseInterface.IPurchaseUpdate>
  ): Promise<purchaseInterface.IPurchase> => {
    const updatedPurchase = await Purchase.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (!updatedPurchase) throw new NotFoundException("Purchase not found");
    return updatedPurchase;
  };

  /**
   * Retrieves a purchase record by its ID.
   *
   * @param id - The purchase record ID.
   * @returns The purchase record.
   * @throws NotFoundException if the purchase is not found.
   */
  public getPurchase = async (
    id: string
  ): Promise<purchaseInterface.IPurchase> => {
    const purchase = await Purchase.findById(id);
    if (!purchase) throw new NotFoundException("Purchase not found");
    return purchase;
  };

  /**
   * Retrieves a paginated list of purchase records.
   *
   * @param page - The page number (defaults to 1).
   * @returns An array of purchase records.
   */
  public getPurchases = async (
    page: number = 1
  ): Promise<purchaseInterface.IPurchase[]> => {
    const limit = 20;
    const skip = (page - 1) * limit;
    return await Purchase.find()
      .skip(skip)
      .limit(limit)
      .populate("flashSaleEvent");
  };

  /**
   * Retrieves the purchase leaderboard, sorted by purchase time in ascending order.
   *
   * @returns An array of purchase records representing the leaderboard.
   */
  public getLeaderboard = async (): Promise<purchaseInterface.IPurchase[]> => {
    return await Purchase.find().sort({ purchaseTime: 1 });
  };

  /**
   * Deletes a purchase record by its ID.
   *
   * @param id - The purchase record ID.
   * @param userId - (Optional) The ID of the user performing the deletion.
   * @throws NotFoundException if the purchase is not found.
   */
  public deletePurchase = async (
    id: string,
    userId?: string
  ): Promise<void> => {
    // Optionally, you can add authorization checks here.
    const purchase = await Purchase.findByIdAndDelete(id);
    if (!purchase) throw new NotFoundException("Purchase not found");
  };
}
