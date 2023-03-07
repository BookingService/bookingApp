import { messages } from "../utils/text.js";
import jwt from "jsonwebtoken";
export const isUserAuthenicated = (req, res, next) => {
  let token;
  if (!req.headers.authorization) {
    return res.status(403).json({ message: messages[403] });
  }
  token = req.headers.authorization.slice(7);
  if (!token) {
    return res.status(403).json({ message: messages[403] });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: messages[403] });
  }
};
