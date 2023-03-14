import express from "express";

import {FlatController} from "../controllers/Flat.js";
import {upload} from "../middleware/multerMiddleware.js";

const router = express.Router();
const flatController = new FlatController();
router.get("/", flatController.getFlats);
router.get("/:id", flatController.getFlatById);
router.post("/", upload.array('images'),flatController.createFlat);
router.delete("/:id", flatController.deleteFlatById);
router.post('/upload',flatController.uploadImage)

export default router;