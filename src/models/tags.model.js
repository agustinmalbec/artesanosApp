import { createConnection } from "../config/database.js";

class TagsModel {
    constructor() { }

    async getAllTags() {
        try {
            const connection = await createConnection();
            const [result] = await connection.query("SELECT * FROM tags");
            return result;
        } catch (error) {
            throw new Error("No se pudo obtener");
        }
    }

    async createTag(tag) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "INSERT INTO tags (tag) VALUES(?)",
                [tag]
            );
            return { result: true, id: result.insertId };
        } catch (error) {
            if (error) {
                const connection = await createConnection();
                const [existingTag] = await connection.query(
                    "SELECT id FROM tags WHERE tag = ?",
                    [tag]
                );
                return { id: existingTag[0].id };
            }
            throw new Error("No se pudo crear");
        }

    }

    async createRelationship(image, tag) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "INSERT INTO tags_images (id_image, id_tag ) VALUES(?, ?)",
                [
                    image,
                    tag
                ]
            );
            return (result.affectedRows == 1);
        } catch (error) {
            throw new Error("No se pudo crear");
        }
    }

    async getImagesByTag(tag) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT images.* FROM images JOIN tags_images ti ON images.id = ti.id_image JOIN tags ON ti.id_tag = tags.id WHERE tags.tag LIKE ?",
                [tag]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo obtener");
        }
    }
}

const tagsModel = new TagsModel();
export default tagsModel;