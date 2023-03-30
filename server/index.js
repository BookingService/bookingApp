import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/User.js";
import authRouter from "./src/routes/Auth.js";
import flatRouter from "./src/routes/Flat.js";
import reviewRouter from "./src/routes/Review.js";
import path from "path";
import { fileURLToPath } from "url";
import db from "./src/utils/db.js";
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3005;
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
const router = express.Router();
router.get("/", (req, res) => {
  res.status(201).json({ message: "works" });
});

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/flats", flatRouter);
app.use("/reviews", reviewRouter);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
