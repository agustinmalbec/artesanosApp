import commentsModel from "../models/comments.model.js";
import notificationsModel from "../models/notifications.model.js";
import { commentsController } from "./comments.controller.js";
import jwt from 'jsonwebtoken';
import { io } from "../config/webSocket.js";

class NotificationsController {
    constructor() {
        this.model = notificationsModel;
    }

    getAllNotifications = async (req, res) => {
        try {
            const users = await this.model.getAllNotifications();
            res.render('users', { users });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    getNotificationsByUser = async (req, res) => {
        try {
            const token = req.cookies.jwt;
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const userId = payload.id;
            const notificactions = await this.model.getNotificationsByUser(userId);
            res.json(notificactions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    createNotificationFriends = async (req, res) => {
        try {
            const notification = req.body;
            const friendId = req.params.id;
            notification.user_id_send = req.user.id;
            notification.user_id_receives = friendId;
            notification.type = 'friend';
            await this.model.createNotification(notification);
            io.to(`usuario_${req.user.id}`).emit('nuevaNotificacion', {
                titulo: 'Solicitud de amistad',
                mensaje: 'Te agrego como amigo.'
            });
            res.redirect('/users/gente');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    createNotificationComment = async (req, res) => {
        try {
            const comment = req.body;
            const friendId = req.params.id;
            const notification = {
                user_id_send: req.user.id,
                user_id_receives: friendId,
                type: 'comment',
                image: comment.id_image
            };
            comment.id_user = req.user.id;
            await this.model.createNotification(notification);
            await commentsModel.createComment(comment);
            io.to(`usuario_${req.user.id}`).emit('nuevaNotificacion', {
                titulo: 'Nuevo comentario',
                mensaje: 'Han comentado tu imagen.'
            });
            res.redirect(`/images/${comment.id_image}`);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    updateNotification = async (req, res) => {
        try {
            await this.model.updateNotification(req.params.id);
            res.redirect('/users/perfil');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

}

export const notificationsController = new NotificationsController();