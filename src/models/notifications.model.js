import { createConnection } from "../config/database.js";

class Notifications {
    constructor() { }

    async getAllNotifications() {
        try {
            const connection = await createConnection();
            const [notificacions] = await connection.query("SELECT * FROM notifications");
            return notificacions;
        } catch (error) {
            throw new Error("No se pudo obtener las notificaciones");
        }
    }

    async createNotification(notification) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "INSERT INTO notifications (user_id_send, user_id_receives, type, date, image) VALUES(?, ?, ?, ?, ?)",
                [
                    notification.user_id_send,
                    notification.user_id_receives,
                    notification.type,
                    notification.date = new Date(),
                    notification.image
                ]
            );
            return (result.affectedRows == 1);
        } catch (error) {
            throw new Error("No se pudo crear la notificacion");
        }
    }

    async getNotificationsByUser(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT notifications.*, sender.first_name AS usuario_envia, receiver.first_name AS usuario_recibe, sender.avatar AS avatar FROM notifications JOIN users AS sender ON notifications.user_id_send = sender.id JOIN users AS receiver ON notifications.user_id_receives = receiver.id WHERE notifications.user_id_receives = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudieron obtener las notificaciones");
        }
    }

    async updateNotification(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "UPDATE notifications SET status = 0 WHERE id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo editar la notificacion");
        }
    }

    async deleteNotification(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "DELETE FROM notifications WHERE id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo eliminar la notificacion");
        }
    }
}

const notificationsModel = new Notifications();
export default notificationsModel;