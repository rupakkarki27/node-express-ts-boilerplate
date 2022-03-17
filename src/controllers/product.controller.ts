import logger from "../config/logger";

import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { ProductService } from "../services";
import JSONResponse from "../helpers/JSONResponse";

const productService = new ProductService();

// retrives all the products for a shop
// TODO: Project only needed product details
export const getShopProducts = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;

    if (!isValidObjectId(shopId))
      throw new Error("Cannot cast parameter to valid Object Id");

    const products = await productService.findProducts({
      shop: shopId,
    });

    JSONResponse.success(req, res, products, "All products of shop");
  } catch (e) {
    logger.error(e.message);

    JSONResponse.error(req, res, e.message);
  }
};

// retrives a single product detail of a shop from all the products
export const getProduct = async (req: Request, res: Response) => {
  try {
    const { shopId, productId } = req.params;

    if (!isValidObjectId(shopId) || !isValidObjectId(productId))
      throw new Error("Cannot cast one or more parameter to Object Id");

    const product = await productService.findProduct({
      _id: productId,
      shop: shopId,
    });

    JSONResponse.success(req, res, product, "Product Detail");
  } catch (e) {
    logger.error(e.message);
    JSONResponse.error(req, res, e.message);
  }
};

// retrives all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await productService.findProducts({});

    JSONResponse.success(req, res, allProducts, "Details");
  } catch (e) {
    logger.error(e.message);
    JSONResponse.error(req, res, e.message);
  }
};

// add a new product for a shop
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const newProduct = await productService.addProduct({
      ...body,
    });

    JSONResponse.success(
      req,
      res,
      { product: newProduct },
      "Product added successfully"
    );
  } catch (e) {
    logger.error(e.message);
    JSONResponse.error(req, res, e.message);
  }
};

// update the product of a shop
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { shopId, productId } = req.params;
    const body = req.body;

    const product = await productService.updateProduct(
      { shop: shopId, _id: productId },
      { $set: body }
    );

    if (!product) throw new Error("Error while updating product");

    JSONResponse.success(req, res, { product }, "Successfully updated product");
  } catch (e) {
    logger.error(e.message);
    JSONResponse.error(req, res, e.message);
  }
};

// delete a product of a shop
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { shopId, productId } = req.params;

    const product = await productService.deleteProduct({
      shop: shopId,
      _id: productId,
    });

    if (!product) throw new Error("Error while deleting product");

    JSONResponse.success(req, res, product, "Successfully deleted product");
  } catch (e) {
    logger.error(e.message);
    JSONResponse.error(req, res, e.message);
  }
};

// makes a product of shop unavailable
export const toggleAvailability = async (req: Request, res: Response) => {
  try {
    const { shopId, productId } = req.params;
    const body = req.body;

    const product = await productService.updateProduct(
      { shop: shopId, _id: productId },
      { $set: body }
    );

    if (!product) throw new Error("Error while toggling status");

    JSONResponse.success(req, res, product, "Updated product availability");
  } catch (e) {
    logger.error(e.message);
    JSONResponse.error(req, res, e.message);
  }
};
