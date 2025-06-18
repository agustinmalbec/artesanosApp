import { usersController } from "../controllers/users.controller.js";
import { authToken } from "../middlewares/jwt.middleware.js";
import upload from "../middlewares/multer.middleware.js";

import { Router } from "express";

const usersRouter = Router();

usersRouter.get('/', authToken, usersController.getAllUsers);

usersRouter.post('/', upload.single('avatar'), usersController.createUser);

usersRouter.post('/update/:id', upload.single('avatar'), usersController.updateUser);

usersRouter.post('/auth', usersController.auth);

usersRouter.get('/perfil', authToken, usersController.profile);

usersRouter.get('/gente', authToken, usersController.getAllUsers);

usersRouter.get('/logout', authToken, usersController.logout);

usersRouter.post('/pass/:id', authToken, usersController.changePass);

export default usersRouter;