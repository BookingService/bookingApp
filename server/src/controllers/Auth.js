import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ERROR_MESSAGES } from "../utils/messages.js";
export class AuthController {
  async registrateUser(req, res) {
    try {
      const { email, password, firstName, lastName, age, phone } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUser = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        age,
        phone,
      });
      const token = jwt.sign(
        { userId: createUser._id },
        process.env.SECRET_KEY
      );
      res.status(201).json({ createUser, token });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ message: ERROR_MESSAGES.wrong_credentials_error });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ message: ERROR_MESSAGES.wrong_credentials_error });
      }
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      return res.status(200).json({ user, token });
    } catch (e) {
      res.status(500).json({ message: ERROR_MESSAGES.server_error });
    }
  }
}
