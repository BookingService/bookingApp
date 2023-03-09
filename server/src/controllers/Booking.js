import { Booking } from "../models/Booking.js";
import { ERROR_MESSAGES } from "../utils/messages.js";
import { User } from "../models/User.js";
import { Flat } from "../models/Flat.js";
export class BookingController {
  async getAllBookings(req, res) {
    try {
      const { userId, flatId, checkInDate, checkOutDate, status } = req.query;
      const filter = {};
      if (userId) {
        filter.user = userId;
      }
      if (flatId) {
        filter.flat = flatId;
      }
      if (checkInDate) {
        filter.checkIn = { $gte: new Date(checkInDate) };
      }
      if (checkOutDate) {
        filter.checkOut = { $lte: new Date(checkOutDate) };
      }
      if (status) {
        filter.status = status;
      }

      const bookings = await Booking.find(filter)
        .populate("user")
        .populate("flat");
      if (!bookings) {
        return res
          .status(404)
          .json({ message: ERROR_MESSAGES.bookings_not_found_error });
      }
      return res.json(bookings);
    } catch {
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }
  async getBookingByBookingId(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findById(id)
        .populate("user")
        .populate("flat");
      if (!booking) {
        return res
          .status(404)
          .json({ message: ERROR_MESSAGES.booking_not_found_error });
      }
      return res.json(booking);
    } catch {
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }
  async createBooking(req, res) {
    try {
      const { user, flat, checkIn, checkOut, totalGuests } = req.body;
      if (!user || !flat || !checkIn || !checkOut || !totalGuests) {
        return res
          .status(400)
          .json({ message: ERROR_MESSAGES.validation_error });
      }
      if (new Date().getTime() > new Date(checkIn).getTime()) {
        return res.status(400).json({
          message: ERROR_MESSAGES.date_error_checkin_earlier_than_today,
        });
      }

      if (new Date(checkIn).getTime() > new Date(checkOut).getTime()) {
        return res.status(400).json({ message: ERROR_MESSAGES.date_error });
      }
      if (new Date(checkIn).getTime() === new Date(checkOut).getTime()) {
        return res
          .status(400)
          .json({ message: ERROR_MESSAGES.same_date_error });
      }
      const foundedFlat = await Flat.findById(flat);
      if (!foundedFlat) {
        return res.status(404).json({ message: ERROR_MESSAGES.flat_not_found });
      }

      const totalNights = Math.floor(
        (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
      );
      const totalPrice = totalNights * foundedFlat.pricePerNight;
      const newBooking = await Booking.create({
        user,
        flat,
        checkIn,
        checkOut,
        totalPrice,
        totalGuests,
      });
      await newBooking.save();
      await User.findByIdAndUpdate(
        user,
        {
          $push: { bookings: newBooking._id },
        },
        { new: true }
      );
      const populateBooking = await Booking.findById(newBooking._id)
        .populate("user")
        .populate("flat");
      res.status(201).json(populateBooking);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }
  async updateBooking(req, res) {
    try {
      const { id } = req.params;
      const { checkInDate, checkOutDate, totalGuests, status } = req.body;
      if (checkInDate && checkOutDate) {
        if (
          new Date(checkInDate).getTime() > new Date(checkOutDate).getTime()
        ) {
          return res.status(400).json({ message: ERROR_MESSAGES.date_error });
        } else if (
          new Date(checkInDate).getTime() === new Date(checkOutDate).getTime()
        ) {
          return res
            .status(400)
            .json({ message: ERROR_MESSAGES.same_date_error });
        }
      }

      if (totalGuests && totalGuests === 0) {
        return res
          .status(400)
          .json({ message: ERROR_MESSAGES.zero_guests_error });
      }
      const updateFields = {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        totalGuests,
        status,
      };

      const booking = await Booking.findByIdAndUpdate(id, updateFields, {
        new: true,
      }).populate("user flat");
      if (!booking) {
        return res
          .status(404)
          .json({ message: ERROR_MESSAGES.booking_not_found_error });
      }
      res.json(booking);
    } catch (e) {
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }

  async deleteBooking(req, res) {
    try {
      const { id } = req.params;
      const deteledBooking = await Booking.findByIdAndDelete(id);
      if (!deteledBooking) {
        res
          .status(404)
          .json({ message: ERROR_MESSAGES.booking_not_found_error });
      }
      res.status(204).json();
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }
}
