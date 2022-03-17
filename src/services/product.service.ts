import { Aggregate, FilterQuery } from "mongoose";
import Product, { IProduct } from "../models/product.model";

export default class ProductService {
  /**
   * @description retrives a product that matches the filter
   * @param filter : the filter object for the query;
   * @returns a shop that matches the filter
   */
  async findProduct(filter: FilterQuery<IProduct>) {
    const product = await Product.findOne(filter);

    return product;
  }

  /**
   * @description retirves a list of product that match the filter
   * @param  {FilterQuery<IProduct>} filter: filter object
   * @returns all the products that matches the filter
   */
  async findProducts(filter: FilterQuery<IProduct>) {
    const products: IProduct[] = await Product.find(filter);

    return products;
  }

  /**
   * @description adds a new product to the database
   * @param  {IProduct} newProduct details of the new product
   * @returns newly created product document
   */
  async addProduct(newProduct: IProduct) {
    const product = await new Product(newProduct).save();

    return product;
  }

  /**
   * @description updates a product that matches the filter
   * @param  {FilterQuery<IProduct>} filter
   * @param  {object} body
   * @returns Promise<IProduct> producr document
   */
  async updateProduct(
    filter: FilterQuery<IProduct>,
    body: object
  ): Promise<IProduct> {
    const product = await Product.findOneAndUpdate(filter, body, { new: true });

    return product;
  }

  /**
   * @description deletes a single product by id
   * @param  {string} productId ID of the product to delete
   * @returns the object as it was previously
   */
  async deleteProductById(productId: string): Promise<IProduct> {
    const product = await Product.findByIdAndDelete(productId);

    return product;
  }

  /**
   * @description deletes a product that matches the filter
   * @param  {FilterQuery<IProduct>} filter
   * @returns the product document as it was
   */
  async deleteProduct(filter: FilterQuery<IProduct>): Promise<IProduct> {
    const product = await Product.findOneAndDelete(filter);

    return product;
  }

  async aggregate(aggregatePipeline: unknown[]): Promise<Aggregate<unknown[]>> {
    const result = Product.aggregate(aggregatePipeline);

    return result;
  }
}
