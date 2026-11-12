
import express from "express";

import { createDestination, addMany } from "../controllers/addController.js";
import { getDestinations, getById, getByName, getCategories, getCount } from "../controllers/getController.js";
import { updateById, updateByName } from "../controllers/updateController.js";
import { deleteById, deleteByName, deleteMany } from "../controllers/deleteController.js";

const router = express.Router();

// Add destinations
router.post("/", createDestination);
router.post("/addMany", addMany);

// Get destinations
router.get("/", getDestinations);
router.get("/categories", getCategories);
router.get("/count", getCount);
router.get("/name/:name", getByName);
router.get("/:id", getById);

// Update destinations
router.patch("/name/:name", updateByName);
router.patch("/:id", updateById);

// Delete destinations
router.delete("/name/:name", deleteByName);
router.delete("/cleanup", deleteMany);
router.delete("/:id", deleteById);

export default router;
