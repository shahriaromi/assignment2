import express from "express";
import { orderControllers } from "./order.controller";

const router = express.Router();

router.post("/", orderControllers.createOrder);
router.get("/", orderControllers.getOrders);
//catch all route
router.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found on server",
  });
});

export const orderRoutes = router;
