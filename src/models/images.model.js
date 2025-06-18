import { createConnection } from "../config/database.js";

class Images {
    constructor() { }

    async getAllImages() {
        try {
            const connection = await createConnection();
            const [images] = await connection.query("SELECT * FROM images");
            return images;
        } catch (error) {
            throw new Error("No se pudo obtener las imagenes");
        }
    }

    async createImage(image) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "INSERT INTO images (url, title, description, date, id_user) VALUES(?, ?, ?, ?, ?)",
                [
                    image.url,
                    image.title,
                    image.description,
                    image.date = new Date(),
                    image.id_user
                ]
            );
            return ({ result: result.affectedRows == 1, id: result.insertId });
        } catch (error) {
            throw new Error("No se pudo crear la imagen");
        }
    }

    async getImageById(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT * FROM images WHERE id = ?",
                [id]
            );
            return result[0];
        } catch (error) {
            throw new Error("No se pudo obtener la imagen");
        }
    }

    async getImagesByUser(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT images.* FROM images JOIN users ON images.id_user = users.id WHERE images.id_user = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo obtener la imagen");
        }
    }

    async shareImage(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "UPDATE images SET featured = TRUE WHERE id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo editar la notificacion");
        }
    }

    async deleteImage(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "DELETE FROM images WHERE id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo eliminar la imagen");
        }
    }
}

const imagesModel = new Images();
export default imagesModel;