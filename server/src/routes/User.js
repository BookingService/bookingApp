import express from "express";
import { UserController } from "../controllers/User.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();
const userController = new UserController();

router.get("/:id", userController.getUser);

router.put("/:id", checkAuth, userController.changeUser);

router.post("/favorites", checkAuth, userController.addToFavorites);

router.delete("/:id", checkAuth, userController.deleteUser);

export default router;
