import eventsModel from "../models/events.model.js";
import notificationsModel from "../models/notifications.model.js";

class EventsController {
    constructor() {
        this.model = eventsModel;
    }

    getEvents = async (req, res) => {
        try {
            const notifications = await notificationsModel.getNotificationsByUser(req.user.id);
            let notis = 0;
            for (const not of notifications) {
                if (not.status) {
                    notis++;
                }
            }
            const events = await this.model.getAllEvents();
            res.render('events', { title: 'Eventos', events, userId: req.user.id, notis, notifications });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    createEvent = async (req, res) => {
        try {
            const event = req.body;
            const { id } = await this.model.createEvent(event);
            await this.model.createRelationship(id, req.user.id);
            res.redirect('/events');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    getUsersByEvent = async (req, res) => {
        try {
            const notifications = await notificationsModel.getNotificationsByUser(req.user.id);
            let notis = 0;
            for (const not of notifications) {
                if (not.status) {
                    notis++;
                }
            }
            const event = await this.model.getEventById(req.params.id);
            const users = await this.model.getUsersByEvent(req.params.id);
            res.render('event', { title: 'Evento', users, event, notis, notifications });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    updateEvent = async (req, res) => {
        try {
            await this.model.createRelationship(req.params.id, req.user.id);
            res.redirect(`/events/${req.params.id}`);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

export const eventsController = new EventsController();