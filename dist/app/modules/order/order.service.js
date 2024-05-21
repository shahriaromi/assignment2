"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../product/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the product in the inventory
        const id = mongoose_1.default.Types.ObjectId.isValid(order.productId);
        if (!id) {
            throw new Error("Invalid product ID");
        }
        const product = yield product_model_1.default.findById(order.productId);
        if (!product || product.inventory.quantity < order.quantity) {
            throw new Error("Insufficient stock");
        }
        // Reduce the quantity in the inventory and update the inStock property
        product.inventory.quantity -= order.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        // Save the updated product
        yield product.save();
        // Create the new order
        const newOrder = yield order_model_1.default.create(order);
        return newOrder;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const getOrdersFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let orders;
        if (email) {
            orders = yield order_model_1.default.find({ email });
            if (orders.length === 0) {
                throw new Error("No orders found for this email");
            }
        }
        else {
            orders = yield order_model_1.default.find();
            if (orders.length === 0) {
                throw new Error("No orders found");
            }
        }
        return orders;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.orderServices = {
    createOrderIntoDB,
    getOrdersFromDB,
};
