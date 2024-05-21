import { z } from "zod";

const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string().min(1, "Product ID is required"),
  price: z.number().nonnegative("Price must be a non-negative number"),
  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer"),
});

export { orderValidationSchema };
