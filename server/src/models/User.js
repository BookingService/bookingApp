import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    favorites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Flat",
      },
    ],
    bookings: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Booking",
      },
    ],
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
