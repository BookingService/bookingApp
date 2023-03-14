import express from "express";
import { BookingController } from "../controllers/Booking.js";

const router = express.Router();
const bookingController = new BookingController();
router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingByBookingId);
router.post("/", bookingController.createBooking);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

export default router;