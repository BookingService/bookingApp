import { ERROR_MESSAGES } from "../utils/messages.js";
import { Flat } from "../models/Flat.js";
import { Review } from "../models/Review.js";
import mongoose from "mongoose";
export class ReviewController {
  async createReview(req, res) {
    try {
      const { rating, description, flatId, userId } = req.body;
      if (!rating || !flatId || !userId) {
        return res
          .status(400)
          .json({ message: ERROR_MESSAGES.bad_request_error });
      }
      const flat = await Flat.findById(flatId);
      if (!flat) {
        return res.status(404).json({ message: ERROR_MESSAGES.flat_not_found });
      }
      const userObjectId = new mongoose.Types.ObjectId(userId);
      if (flat.host.equals(userObjectId)) {
        return res
          .status(400)
          .json({ message: ERROR_MESSAGES.bad_request_for_review });
      }
      const createdReview = await Review.create({
        rating,
        description,
        flatId,
        userId,
      });
      const findReview = await Review.findById(createdReview._id).populate(
        "userId flatId"
      );
      await Flat.findByIdAndUpdate(
        flatId,
        {
          $push: { reviews: createdReview },
        },
        { new: true }
      );
      return res.status(201).json(findReview);
    } catch (e) {
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }
  async deleteReview(req, res) {
    try {
      const { id } = req.params;
      await Review.findByIdAndDelete(id);
      res.status(204).json();
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }
  async updateReview(req, res) {
    try {
      const { id } = req.params;
      const { rating, description } = req.body;
      const updatedFields = {
        rating,
        description: description ?? null,
      };
      const review = await Review.findByIdAndUpdate(id, updatedFields, {
        new: true,
      });
      res.json(review);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }
}
