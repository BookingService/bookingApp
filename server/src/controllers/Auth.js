import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { messages } from '../utils/text.js';
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
      res.status(201).json(createUser);
    } catch (e) {
      res.status(500).json({ message: messages[500] });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ message: messages.wrong_credentials_error });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ message: messages.wrong_credentials_error });
      }
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      return res.status(200).json({ user, token });
    } catch (e) {
      res.status(500).json({ message: messages[500] });
    }
  }
}
