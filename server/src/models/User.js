import mongoose from 'mongoose';

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
      type: Date,
      required: true,
    },
    favorites: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Flat',
        default: [],
      },
    ],
    bookings: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Booking',
        default: [],
      },
    ],
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model('User', UserSchema);
