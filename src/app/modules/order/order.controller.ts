/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import { orderServices } from "./order.service";
import { orderValidationSchema } from "./oder.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const zodParsedOrder = orderValidationSchema.parse(order);

    const result = await orderServices.createOrderIntoDB(zodParsedOrder);
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await orderServices.getOrdersFromDB(email as string);
    if (result.length === 0) {
      throw new Error("No order found");
    }
    res.status(200).json({
      success: true,
      message: email
        ? "Orders fetched successfully for user email!"
        : "Orders fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const orderControllers = {
  createOrder,
  getOrders,
};
