"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post("/", order_controller_1.orderControllers.createOrder);
router.get("/", order_controller_1.orderControllers.getOrders);
//catch all route
router.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found on server",
    });
});
exports.orderRoutes = router;
