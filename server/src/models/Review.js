import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    flatId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Flat",
    },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model("Review", ReviewSchema);
