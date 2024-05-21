/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import ProductModel from "./product.model";

const createProductIntoDB = async (product: TProduct) => {
  try {
    // Check if a product with the same name already exists
    const existingProduct = await ProductModel.findOne({ name: product.name });
    if (existingProduct) {
      throw new Error("A product with this name already exists");
    }

    // If not, create the new product
    const result = await ProductModel.create(product);
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getProductsFromDB = async (searchTerm?: string) => {
  try {
    let result;

    if (searchTerm) {
      result = await ProductModel.find({
        name: { $regex: searchTerm, $options: "i" },
      });
      if (result.length === 0) {
        throw new Error("Product not found from searching");
      }
    } else {
      result = await ProductModel.find();
      if (result.length === 0) {
        throw new Error("No product found");
      }
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getProductByIdFromDB = async (productId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("product not found. Invalid ObjectId");
    }

    const result = await ProductModel.findOne({ _id: productId });
    if (!result) {
      throw new Error("Product not found");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateProductByIdInDB = async (productId: string, product: TProduct) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("Product update failed. Invalid Id");
    }

    const result = await ProductModel.findOneAndUpdate(
      { _id: productId },
      { $set: product },
      { new: true }
    );
    if (!result) {
      throw new Error("Product not found");
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteProductByIdFromDB = async (productId: string) => {
  try {
    const result = await ProductModel.findOneAndDelete({ _id: productId });
    if (!result) {
      throw new Error("Product deleting failed");
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const productServices = {
  createProductIntoDB,
  getProductByIdFromDB,
  updateProductByIdInDB,
  deleteProductByIdFromDB,
  getProductsFromDB,
};
