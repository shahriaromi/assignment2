import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";
import { z } from "zod";

const OrderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const OrderZodSchema = z.object({
  email: z.string().email(),
  productId: z.string().min(1, "Product ID is required"),
  price: z.number().nonnegative("Price must be a non-negative number"),
  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer"),
});

// Create a Mongoose model
const OrderModel = model<TOrder>("Order", OrderSchema);

export default OrderModel;
export { OrderZodSchema };
