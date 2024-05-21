import express from "express";
import { productControllers } from "./product.controller";

const router = express.Router();

router.post("/", productControllers.createProduct);
router.get("/", productControllers.getAllProducts);
router.get("/:productId", productControllers.getProductById);
router.put("/:productId", productControllers.updateProductById);
router.delete("/:productId", productControllers.deleteProductById);

router.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found on server",
  });
});

export const productRoutes = router;
