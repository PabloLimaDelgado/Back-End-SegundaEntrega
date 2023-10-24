import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";
import { cartsManager } from "../managers/cartsManager.js";

const router = Router();

router.get("/products", async (req, res) => {
  const response = await productsManager.findAll(req.query);
  const plainProducts = response.payload.map((product) => product.toObject());
  res.render("viewsProducts", { products: plainProducts });
});

router.get("/products/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const product = await productsManager.findById(idProduct);
  const plainProduct = product.toObject();

  res.render("viewsProduct", { products: plainProduct });
});

router.get("/carts/:idCart", async (req, res) => {
  const { idCart } = req.params;
  const cart = await cartsManager.findById(idCart);
  const plainCart = cart.toObject();
  res.render("viewsCarts", { carts: plainCart });

  console.log(cart);
});

export default router;
