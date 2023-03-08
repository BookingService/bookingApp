import { messages } from "../utils/text.js";
import jwt from "jsonwebtoken";
export const isUserAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: messages[403] });
  }
  const token = req.headers.authorization.slice(7);
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: messages[403] });
  }
};
