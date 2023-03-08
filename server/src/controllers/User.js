import { User } from '../models/User.js';
import { messages } from '../utils/text.js';
import { Booking } from '../models/Booking.js';
import { Flat } from '../models/Flat.js';
export class UserController {
  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id)
        .populate('bookings')
        .populate('favorites');
      if (!user) {
        return res.status(404).json({ message: messages.user_not_found_error });
      }

      res.json(user);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      return res.status(204).json();
    } catch (e) {
      res.status(500).json({ message: messages[500] });
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
        { new: true },
      );
      if (!user) {
        return res.status(404).json({ message: messages.user_not_found_error });
      }
      return res.json(user);
    } catch (e) {
      res.status(500).json({ message: messages[500] });
    }
  }
}
