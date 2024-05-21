/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import ProductModel from "../product/product.model";
import { TOrder } from "./order.interface";
import OrderModel from "./order.model";

const createOrderIntoDB = async (order: TOrder) => {
  try {
    // Find the product in the inventory

    const id = mongoose.Types.ObjectId.isValid(order.productId);
    if (!id) {
      throw new Error("Invalid product ID");
    }
    const product = await ProductModel.findById(order.productId);


    if (!product || product.inventory.quantity < order.quantity) {
      throw new Error("Insufficient stock");
    }

    // Reduce the quantity in the inventory and update the inStock property
    product.inventory.quantity -= order.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    // Save the updated product
    await product.save();

    // Create the new order
    const newOrder = await OrderModel.create(order);

    return newOrder;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getOrdersFromDB = async (email?: string) => {
  try {
    let orders;

    if (email) {
      orders = await OrderModel.find({ email });
      if (orders.length === 0) {
        throw new Error("No orders found for this email");
      }
    } else {
      orders = await OrderModel.find();
      if (orders.length === 0) {
        throw new Error("No orders found");
      }
    }

    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const orderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
};
