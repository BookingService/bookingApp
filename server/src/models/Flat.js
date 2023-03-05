import mongoose from "mongoose";

const FlatSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    host: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    maxGuests: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Flat = mongoose.model("Flat", FlatSchema);
