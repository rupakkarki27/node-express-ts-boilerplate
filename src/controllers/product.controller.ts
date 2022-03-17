import logger from "../config/logger";

import { Request, Response } from "express";
import { makeDataObject, makeErrorObject } from "../helpers/makeResponse";
import { isValidObjectId } from "mongoose";
import { ProductService } from "../services";

const productService = new ProductService();

// retrives all the products for a shop
// TODO: Project only needed product details
export const getShopProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { shopId } = req.params;

    if (!isValidObjectId(shopId))
      throw new Error("Cannot cast parameter to valid Object Id");

    const products = await productService.findProducts({
      shop: shopId,
    });

    return res
      .status(200)
      .json(makeDataObject("All products of shop", { products }));
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(makeErrorObject(e.message));
  }
};

// retrives a single product detail of a shop from all the products
export const getProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { shopId, productId } = req.params;

    if (!isValidObjectId(shopId) || !isValidObjectId(productId))
      throw new Error("Cannot cast one or more parameter to Object Id");

    const product = await productService.findProduct({
      _id: productId,
      shop: shopId,
    });

    return res.status(200).json(makeDataObject("Product Detail", { product }));
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(makeErrorObject("Cannot fetch product."));
  }
};

// retrives all products
export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allProducts = await productService.findProducts({});

    return res
      .status(200)
      .json(makeDataObject("All Products", { products: allProducts }));
  } catch (e) {
    logger.error(e.message);
    return res
      .status(500)
      .json(makeErrorObject("Error while fetching products."));
  }
};

// add a new product for a shop
export const addProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { body } = req;

    const newProduct = await productService.addProduct({
      ...body,
    });

    return res
      .status(200)
      .json(
        makeDataObject("Product added Successfully", { product: newProduct })
      );
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(makeErrorObject(e.message));
  }
};

// update the product of a shop
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { shopId, productId } = req.params;
    const body = req.body;

    const product = await productService.updateProduct(
      { shop: shopId, _id: productId },
      { $set: body }
    );

    if (!product) throw new Error("Error while updating product");

    return res.status(200).json(makeDataObject("Successfully updated product"));
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(makeErrorObject(e.message));
  }
};

// delete a product of a shop
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { shopId, productId } = req.params;

    const product = await productService.deleteProduct({
      shop: shopId,
      _id: productId,
    });

    if (!product) throw new Error("Error while deleting product");

    return res.status(200).json(makeDataObject("Successfully deleted product"));
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(makeErrorObject(e.message));
  }
};

// makes a product of shop unavailable
export const toggleAvailability = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { shopId, productId } = req.params;
    const body = req.body;

    const product = await productService.updateProduct(
      { shop: shopId, _id: productId },
      { $set: body }
    );

    if (!product) throw new Error("Error while toggling status");

    return res.status(200).json(makeDataObject("Updated product availability"));
  } catch (e) {
    logger.error(e.message);
    return res.status(500).json(makeErrorObject(e.message));
  }
};
