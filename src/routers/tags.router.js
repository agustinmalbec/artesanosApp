import { tagsController } from "../controllers/tags.controller.js";
import { authToken } from "../middlewares/jwt.middleware.js";

import { Router } from "express";

const tagsRouter = Router();

tagsRouter.get('/', authToken, tagsController.getImagesByTag);

tagsRouter.post('/:id', authToken, tagsController.insertTag);



export default tagsRouter;