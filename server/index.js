import cors from "cors";
import express from "express";
import dotenv from "dotenv";
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
app.use("/api", router);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
