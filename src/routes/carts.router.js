import { Router } from "express";
import { cartsManager } from "../managers/cartsManager.js";

const router = Router();

router.post("/", async (req, res) => {
  const cart = await cartsManager.createOne(req.body);
  res.json({ cart });
});

router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  const cart = await cartsManager.findById(idCart);
  res.json({ cart });
});

router.delete("/:idCart/products/:idProduct", async (req, res) => {
  const cartId = req.params.idCart;
  const productId = req.params.idProduct;

  const updatedCart = await cartsManager.removeProductFromCart(
    cartId,
    productId
  );

  res.json({ updatedCart });
});

router.put("/:idCart", async (req, res) => {
  const cartId = req.params.idCart;
  const updatedCart = await cartsManager.updateCartProducts(
    cartId,
    req.body.products
  );

  res.json({ updatedCart });
});

//NO ENTENDI ESTE PUNTO
/* router.put('/:idCart/products/:idProduct', async (req, res) => {
      const cartId = req.params.idCart;
      const productId = req.params.idProduct;

      const newQuantity = req.body.quantity;

      const updatedCart = await cartsManager.updateProductQuantity(cartId, productId, newQuantity);
  
      res.json({updatedCart});
  }); */

router.delete("/:idCart", async (req, res) => {
  const { idCart } = req.params;

  const clearedCart = await cartsManager.clearCartProducts(idCart);
  res.json({ clearedCart });
});

export default router;
