import { ReviewController } from "../controllers/Review.js";
import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();
const reviewController = new ReviewController();

router.post("/", checkAuth, reviewController.createReview);
router.delete("/:id", checkAuth, reviewController.deleteReview);
router.put("/:id", checkAuth, reviewController.updateReview);

export default router;
