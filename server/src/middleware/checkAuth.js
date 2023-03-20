import { ERROR_MESSAGES } from "../utils/messages.js";
import jwt from "jsonwebtoken";
export const checkAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: ERROR_MESSAGES.no_token_error });
  }
  const token = req.headers.authorization.slice(7);
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: ERROR_MESSAGES.no_token_error });
  }
};
