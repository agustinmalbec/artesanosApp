import { createConnection } from "../config/database.js";

class Albums {
    constructor() { }

    async getAllAlbums() {
        try {
            const connection = await createConnection();
            const [albums] = await connection.query("SELECT * FROM albums");
            return albums;
        } catch (error) {
            throw new Error("No se pudo obtener los albums");
        }
    }

    async createAlbum(album) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "INSERT INTO albums (id_user, title, description) VALUES(?, ?, ?)",
                [
                    album.id_user,
                    album.title,
                    album.description
                ]
            );
            return ({ result: result.affectedRows == 1, id: result.insertId });
        } catch (error) {
            throw new Error("No se pudo crear el album");
        }
    }

    async getAlbumByUser(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT albums.* FROM albums JOIN users ON albums.id_user = users.id WHERE users.id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo obtener el album");
        }
    }

    async getAlbumById(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT * FROM albums WHERE id = ?",
                [id]
            );
            return result[0];
        } catch (error) {
            throw new Error("No se pudo obtener el album");
        }
    }

    async deleteAlbum(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "DELETE FROM albums WHERE id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo eliminar el album");
        }
    }
}

const albumsModel = new Albums();
export default albumsModel;