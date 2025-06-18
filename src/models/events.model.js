import { createConnection } from "../config/database.js";

class EventsModel {
    constructor() { }

    async getAllEvents() {
        try {
            const connection = await createConnection();
            const [result] = await connection.query("SELECT * FROM events");
            return result;
        } catch (error) {
            throw new Error("No se pudo obtener");
        }
    }

    async createEvent(event) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "INSERT INTO events (date, title, type, places, owner) VALUES(?, ?, ?, ?, ?)",
                [
                    event.date,
                    event.title,
                    event.type,
                    event.places,
                    event.owner
                ]
            );
            return ({ result: result.affectedRows == 1, id: result.insertId });
        } catch (error) {
            throw new Error("No se pudo crear");
        }
    }

    async createRelationship(event, user) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "INSERT INTO events_users (id_user, id_event) VALUES(?, ?)",
                [
                    user,
                    event
                ]
            );
            return (result.affectedRows == 1);
        } catch (error) {
            throw new Error("No se pudo crear");
        }
    }

    async getEventById(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT events.*, CONCAT(users.first_name, ' ', users.last_name) AS user FROM events JOIN users ON events.owner = users.id WHERE events.id = ?",
                [id]
            );
            return result[0];
        } catch (error) {
            throw new Error("No se pudo obtener");
        }
    }

    async getUsersByEvent(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT users.avatar, CONCAT(users.first_name, ' ', users.last_name) AS name FROM events_users JOIN users ON events_users.id_user = users.id JOIN events ON events_users.id_event = events.id WHERE events.id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo obtener");
        }
    }

    async deleteEvent(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "DELETE FROM events WHERE id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo eliminar");
        }
    }
}

const eventsModel = new EventsModel();
export default eventsModel;