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
exports.productServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("./product.model"));
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if a product with the same name already exists
        const existingProduct = yield product_model_1.default.findOne({ name: product.name });
        if (existingProduct) {
            throw new Error("A product with this name already exists");
        }
        // If not, create the new product
        const result = yield product_model_1.default.create(product);
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const getProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        if (searchTerm) {
            result = yield product_model_1.default.find({
                name: { $regex: searchTerm, $options: "i" },
            });
            if (result.length === 0) {
                throw new Error("Product not found from searching");
            }
        }
        else {
            result = yield product_model_1.default.find();
            if (result.length === 0) {
                throw new Error("No product found");
            }
        }
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const getProductByIdFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            throw new Error("product not found. Invalid ObjectId");
        }
        const result = yield product_model_1.default.findOne({ _id: productId });
        if (!result) {
            throw new Error("Product not found");
        }
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const updateProductByIdInDB = (productId, product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            throw new Error("Product update failed. Invalid Id");
        }
        const result = yield product_model_1.default.findOneAndUpdate({ _id: productId }, { $set: product }, { new: true });
        if (!result) {
            throw new Error("Product not found");
        }
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const deleteProductByIdFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.default.findOneAndDelete({ _id: productId });
        if (!result) {
            throw new Error("Product deleting failed");
        }
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.productServices = {
    createProductIntoDB,
    getProductByIdFromDB,
    updateProductByIdInDB,
    deleteProductByIdFromDB,
    getProductsFromDB,
};
