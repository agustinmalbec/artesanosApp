import { createConnection } from "../config/database.js";

class Friends {
    constructor() { }

    async getAllFriends() {
        try {
            const connection = await createConnection();
            const [friends] = await connection.query("SELECT * FROM friends");
            return friends;
        } catch (error) {
            throw new Error("No se pudo obtener las amistades");
        }
    }

    async createFriend(friend) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "INSERT INTO friends (id_user_from, id_user_to) VALUES(?, ?)",
                [
                    friend.id_user_from,
                    friend.id_user_to
                ]
            );
            return (result.affectedRows == 1);
        } catch (error) {
            throw new Error("No se pudo crear la amistad");
        }
    }

    async getFriendsById(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT friends.*, user.first_name AS usuario, friend.first_name AS amigo, user.avatar AS avatar FROM friends JOIN users AS user ON friends.id_user_from = user.id JOIN users AS friend ON friends.id_user_to = friend.id WHERE friends.id_user_from = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo obtener la amistad");
        }
    }

    async deleteFriend(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "DELETE FROM friends WHERE id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo eliminar la amistad");
        }
    }
}

const friendsModel = new Friends();
export default friendsModel;