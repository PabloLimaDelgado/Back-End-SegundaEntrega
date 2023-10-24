import { cartsModel } from "../db/models/carts.model.js";

class CartsManager {
  async createOne(obj) {
    const createdCart = await cartsModel.create(obj);
    return createdCart;
  }

  async findById(id) {
    const cart = await cartsModel.findById(id).populate("products");
    return cart;
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await this.findById(cartId);
    const productIndex = cart.products.indexOf(productId);

    cart.products.splice(productIndex, 1);
    await cart.save();
  }

  async updateCartProducts(cartId, newProduct) {
    const cart = await this.findById(cartId);

    cart.products = newProduct;
    await cart.save();
    return cart;
  }

  //NO ENTENDI ESTE PUNTO
  /*async updateProductQuantity(cartId, productId, newQuantity) {
    const cart = await this.findById(cartId);

    const product = cart.products.find(
      (p) => p.product && p.product.toString() === productId
    );

    if (!product) {
      throw new Error("Product not found in cart");
    }

    product.quantity = newQuantity;
    await cart.save();

    return cart;
  } */

  async clearCartProducts(cartId) {
    const cart = await this.findById(cartId);

    cart.products = [];
    await cart.save();
    return cart;
  }
}

export const cartsManager = new CartsManager();
