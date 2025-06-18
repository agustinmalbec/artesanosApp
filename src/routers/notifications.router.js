import { notificationsController } from "../controllers/notifications.controller.js";
import { authToken } from "../middlewares/jwt.middleware.js";

import { Router } from "express";

const notificationsRouter = Router();

notificationsRouter.post('/friend/:id', authToken, notificationsController.createNotificationFriends);

notificationsRouter.post('/comment/:id', authToken, notificationsController.createNotificationComment);

notificationsRouter.get('/update/:id', authToken, notificationsController.updateNotification);

notificationsRouter.get('/', notificationsController.getNotificationsByUser);

export default notificationsRouter;