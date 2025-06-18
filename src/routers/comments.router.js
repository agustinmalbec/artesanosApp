import { commentsController } from "../controllers/comments.controller.js";
import { authToken } from "../middlewares/jwt.middleware.js";

import { Router } from "express";

const commentsRouter = Router();

commentsRouter.post('/:id', authToken, commentsController.createComment);


export default commentsRouter;