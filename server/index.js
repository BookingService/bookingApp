import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/User.js";
import authRouter from "./src/routes/Auth.js";
import bookingRouter from "./src/routes/Booking.js";
import db from "./src/utils/db.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3005;

const router = express.Router();
router.get("/", (req, res) => {
  res.status(201).json({ message: "works" });
});

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/bookings", bookingRouter);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
