import { User } from "../models/User.js";
import { ERROR_MESSAGES } from "../utils/messages.js";
import { Booking } from "../models/Booking.js";
import { Flat } from "../models/Flat.js";
export class UserController {
  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id)
        .populate("bookings")
        .populate("favorites");
      if (!user) {
        return res
          .status(404)
          .json({ message: ERROR_MESSAGES.user_not_found_error });
      }

      res.json(user);
    } catch (e) {
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      return res.status(204).json();
    } catch (e) {
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }
  async changeUser(req, res) {
    try {
      const { id } = req.params;
      const { firstName, lastName, phone, email } = req.body;
      const user = await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          email,
          phone,
        },
        { new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: ERROR_MESSAGES.user_not_found_error });
      }
      return res.json(user);
    } catch (e) {
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }
}
