import { Router } from "express";
import ProductManager from "../managers/ProductsManager.js";
import uploader from "../utils/uploader.js";

const router = Router();
const ProductManager = new ProductManager();

// Ruta para obtener los ingredientes
router.get("/", async (req, res) => {
  try {
    const ingredients = await ProductManager.getAll(req.query);
    res.status(200).json({ status: "success", payload: ingredients });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});

// Ruta para obtener un ingrediente por su ID
router.get("/:id", async (req, res) => {
  try {
    const ingredient = await ProductManager.getOneById(req.params.id);
    res.status(200).json({ status: "success", payload: ingredient });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});

// Ruta para crear un ingrediente, permite la subida de imágenes
router.post("/", uploader.single("file"), async (req, res) => {
  try {
    const ingredient = await ProductManager.insertOne(req.body, req.file);
    res.status(201).json({ status: "success", payload: ingredient });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});

// Ruta para actualizar un ingrediente por su ID, permite la subida de imágenes
router.put("/:id", uploader.single("file"), async (req, res) => {
  try {
    const ingredient = await ProductManager.updateOneById(
      req.params.id,
      req.body,
      req.file
    );
    res.status(200).json({ status: "success", payload: ingredient });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});

// Ruta para eliminar un ingrediente por su ID
router.delete("/:id", async (req, res) => {
  try {
    await ProductManager.deleteOneById(req.params.id);
    res.status(200).json({ status: "success" });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: "error", message: error.message });
  }
});

export default router;
