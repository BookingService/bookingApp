import mongoose from "mongoose";

const FlatSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
      pricePerNight:{
        type:Number,
          required:true
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
      ref: "User",
    },
    amenities: [
      {
        type: String,
      },
    ],
    imagesUrls: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    requirements: {
      maxGuests: {
        type: Number,
      },
      withAnimals: {
        type: Boolean,
      },
      withKids: {
        type: Boolean,
      },
      isAllowToSmoke: {
        type: Boolean,
      },
      isParkingAvailable: {
        type: Boolean,
      },
    },
    location: {
      type: {
        required: true,
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Flat = mongoose.model("Flat", FlatSchema);
