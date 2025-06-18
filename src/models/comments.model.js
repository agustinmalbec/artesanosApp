import { createConnection } from "../config/database.js";

class Comments {
    constructor() { }

    async getAllComments() {
        try {
            const connection = await createConnection();
            const [users] = await connection.query("SELECT * FROM comments");
            return users;
        } catch (error) {
            throw new Error("No se pudo obtener los comentarios");
        }
    }

    async createComment(comment) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "INSERT INTO comments (id_user, date, comment, id_image) VALUES(?, ?, ?, ?)",
                [
                    comment.id_user,
                    comment.date = new Date(),
                    comment.comment,
                    comment.id_image
                ]
            );
            return (result.affectedRows == 1);
        } catch (error) {
            throw new Error("No se pudo crear el comentario");
        }
    }

    async getCommentsByImage(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT comments.*, CONCAT(users.first_name, ' ', users.last_name) AS name, users.avatar AS avatar FROM comments JOIN users ON comments.id_user = users.id JOIN images ON comments.id_image = images.id WHERE images.id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo obtener el comentario");
        }
    }

    async getCommentsById(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT * FROM comments JOIN users ON comments.id_user = users.id JOIN images ON comments.id_image = images.id WHERE users.id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo obtener el comentario");
        }
    }

    async deleteComment(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "DELETE FROM comments WHERE id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo eliminar el comentario");
        }
    }
}

const commentsModel = new Comments();
export default commentsModel;