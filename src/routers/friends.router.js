import { friendsController } from "../controllers/friends.controller.js";
import { authToken } from "../middlewares/jwt.middleware.js";

import { Router } from "express";

const friendsRouter = Router();

friendsRouter.post('/:id', authToken, friendsController.createFriend);

friendsRouter.post('/delete/:id', authToken, friendsController.deleteFriend);


export default friendsRouter;