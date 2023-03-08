import express from 'express';
import { UserController } from '../controllers/User.js';

const router = express.Router();
const userController = new UserController();

router.get('/:id', userController.getUser);

router.put('/:id', userController.changeUser);

router.delete('/:id', userController.deleteUser);

export default router;

//640647ec342a827be01ff7fc
