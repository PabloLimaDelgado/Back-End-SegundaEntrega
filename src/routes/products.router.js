import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const response = await productsManager.findAll(req.query);
  res.json(response);
});

router.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const product = await productsManager.findById(idProduct);
  res.json({ message: "Product", product });
});

router.post("/", async (req, res) => {
  const createProduct = await productsManager.createOne(req.body);
  res.json({ message: "Product created", product: createProduct });
});

router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const deletedProduct = await productsManager.deleteOne(idProduct);
  res.json({ message: "Product deleted", product: deletedProduct });
});

export default router;
