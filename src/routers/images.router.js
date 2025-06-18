import { imagesController } from "../controllers/images.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { authToken } from "../middlewares/jwt.middleware.js";

import { Router } from "express";

const imagesRouter = Router();

imagesRouter.get('/', authToken, imagesController.getImages);

imagesRouter.post('/', upload.single('url'), authToken, imagesController.createImage);

imagesRouter.get('/:id', authToken, imagesController.getImageById);

imagesRouter.post('/share/:id', authToken, imagesController.shareImage);

imagesRouter.get('/delete/:id', authToken, imagesController.deleteImage);

export default imagesRouter;