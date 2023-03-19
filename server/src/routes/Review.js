import { ReviewController } from "../controllers/Review.js";
import express from "express";

const router = express.Router();
const reviewController = new ReviewController();

router.post("/", reviewController.createReview);
router.delete("/:id", reviewController.deleteReview);
router.put("/:id", reviewController.updateReview);

export default router;
