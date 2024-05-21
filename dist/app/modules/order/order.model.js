"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderZodSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const OrderSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    productId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
const OrderZodSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string().min(1, "Product ID is required"),
    price: zod_1.z.number().nonnegative("Price must be a non-negative number"),
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative("Quantity must be a non-negative integer"),
});
exports.OrderZodSchema = OrderZodSchema;
// Create a Mongoose model
const OrderModel = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = OrderModel;
