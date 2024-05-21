"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string().min(1, "Product ID is required"),
    price: zod_1.z.number().nonnegative("Price must be a non-negative number"),
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative("Quantity must be a non-negative integer"),
});
exports.orderValidationSchema = orderValidationSchema;
