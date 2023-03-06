import { AuthController } from "../controllers/Auth.js";
import express from "express";

const router = express.Router();
const authController = new AuthController();

router.post("/login", authController.login);
router.post("/registration", authController.registrateUser);

export default router;
