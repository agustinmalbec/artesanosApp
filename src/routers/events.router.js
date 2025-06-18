import { eventsController } from "../controllers/events.controller.js";
import { authToken } from "../middlewares/jwt.middleware.js";

import { Router } from "express";

const eventsRouter = Router();

eventsRouter.get('/', authToken, eventsController.getEvents);

eventsRouter.post('/', authToken, eventsController.createEvent);

eventsRouter.post('/:id', authToken, eventsController.updateEvent);

eventsRouter.get('/:id', authToken, eventsController.getUsersByEvent);


export default eventsRouter;