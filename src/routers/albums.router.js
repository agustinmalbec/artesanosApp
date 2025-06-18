import { albumsController } from "../controllers/albums.controller.js";
import { authToken } from "../middlewares/jwt.middleware.js";

import { Router } from "express";

const albumsRouter = Router();


albumsRouter.get('/', authToken, albumsController.albums);

albumsRouter.post('/', authToken, albumsController.createAlbum);

albumsRouter.get('/:id', authToken, albumsController.getAlbumById);

albumsRouter.post('/delete/:id', authToken, albumsController.deleteAlbum);


export default albumsRouter;