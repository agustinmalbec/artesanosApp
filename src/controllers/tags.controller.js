import tagsModel from "../models/tags.model.js";
import notificationsModel from "../models/notifications.model.js";

class TagsController {
    constructor() {
        this.model = tagsModel;
    }

    getTags = async (req, res) => {
        try {
            const events = await this.model.getAllEvents();
            const notifications = await notificationsModel.getNotificationsByUser(req.user.id);
            let notis = 0;
            for (const not of notifications) {
                if (not.status) {
                    notis++;
                }
            }
            res.render('events', { title: 'Eventos', events, userId: req.user.id, notis, notifications });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    insertTag = async (req, res) => {
        try {
            const tag = req.body;
            const { id } = await this.model.createTag(tag.tag);
            await this.model.createRelationship(req.params.id, id);
            res.redirect(`/albums/${tag.album}`);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    getImagesByTag = async (req, res) => {
        try {
            const notifications = await notificationsModel.getNotificationsByUser(req.user.id);
            let notis = 0;
            for (const not of notifications) {
                if (not.status) {
                    notis++;
                }
            }
            const { tag } = req.query;
            const tags = await this.model.getAllTags();
            if (!tag) {
                return res.render('findByTag', { title: 'Buscar por tag', imagenes: [], query: '', tags, notis, notifications });
            }
            const imagenes = await this.model.getImagesByTag(tag);
            res.render('findByTag', { title: 'Buscar por tag', imagenes, query: tag, tags, notis, notifications });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

export const tagsController = new TagsController();