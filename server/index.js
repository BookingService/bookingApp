import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/User.js";
import authRouter from "./src/routes/Auth.js";
import bookingRouter from './src/routes/Booking.js'
import flatRouter from './src/routes/Flat.js'
import db from "./src/utils/db.js";
import {upload} from "./src/middleware/multerMiddleware.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3005;



app.use('/public/uploads',express.static('public/uploads'))
app.post('/upload')
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use('/bookings',bookingRouter)
app.use('/flats',flatRouter)
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
