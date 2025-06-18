import { createConnection } from "../config/database.js";

class AlbumsImages {
    constructor() { }

    async getAllAlbumsImages() {
        try {
            const connection = await createConnection();
            const [albumsImages] = await connection.query("SELECT * FROM albums_images");
            return albumsImages;
        } catch (error) {
            throw new Error("No se pudo obtener");
        }
    }

    async createRelationship(album, image) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "INSERT INTO albums_images (id_album, id_image) VALUES(?, ?)",
                [
                    album,
                    image
                ]
            );
            return (result.affectedRows == 1);
        } catch (error) {
            throw new Error("No se pudo crear");
        }
    }

    async getAlbumImageByAlbum(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT images.* FROM albums_images JOIN albums ON albums_images.id_album = albums.id JOIN images ON albums_images.id_image = images.id WHERE albums.id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo obtener");
        }
    }

    async deleteAlbumImage(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "DELETE FROM albums_images WHERE id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo eliminar");
        }
    }
}

const albumsImagesModel = new AlbumsImages();
export default albumsImagesModel;