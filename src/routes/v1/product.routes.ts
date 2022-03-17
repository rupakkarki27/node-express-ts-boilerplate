import express from "express";
import {
  addProduct,
  updateProduct,
  getProduct,
  getProducts,
  getShopProducts,
  deleteProduct,
  toggleAvailability,
} from "../../controllers";

const router = express.Router();

// route to add a product for a shop
router.post("/products", addProduct);

// route to get every product
router.get("/products", getProducts);

// route to get the products of a shop
router.get("/:shopId/products", getShopProducts);

// route to get a single product detail of a shop
router.get("/:shopId/products/:productId", getProduct);

//route to update a product of a shop
router.patch("/:shopId/products/:productId", updateProduct);

// route to toggle the availability status of a product
router.patch(
  "/:shopId/products/:productId/toggle-available",
  toggleAvailability
);

// route to delete a product of a shop
router.delete("/:shopId/products/:productId", deleteProduct);

export default router;
