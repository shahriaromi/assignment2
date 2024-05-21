"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    price: zod_1.z.number().nonnegative("Price must be a non-negative number"),
    category: zod_1.z.string().min(1, "Category is required"),
    tags: zod_1.z.array(zod_1.z.string()).nonempty("Tags must not be empty"),
    variants: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.string().min(1, "Variant type is required"),
        value: zod_1.z.string().min(1, "Variant value is required"),
    })),
    inventory: zod_1.z.object({
        quantity: zod_1.z
            .number()
            .int()
            .nonnegative("Quantity must be a non-negative integer"),
        inStock: zod_1.z.boolean(),
    }),
});
exports.productValidationSchema = productValidationSchema;
