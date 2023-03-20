import express from "express";

import { FlatController } from "../controllers/Flat.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();
const flatController = new FlatController();
router.get("/", flatController.getFlats);
router.get("/:id", flatController.getFlatById);
router.post("/", checkAuth, flatController.createFlat);
router.delete("/:id", checkAuth, flatController.deleteFlatById);
router.post("/upload", checkAuth, flatController.uploadImage);

export default router;
