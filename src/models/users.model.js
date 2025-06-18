import { createConnection } from "../config/database.js";

class Users {
    constructor() { }

    async getAllUsers() {
        try {
            const connection = await createConnection();
            const [users] = await connection.query("SELECT * FROM users");
            return users;
        } catch (error) {
            throw new Error("No se pudo obtener los usuarios");
        }
    }

    async createUser(user) {
        console.log(user);

        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "INSERT INTO users (first_name, last_name, password, username, email, birthdate, gender, province, avatar) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    user.first_name,
                    user.last_name,
                    user.password,
                    user.username,
                    user.email,
                    user.birthdate,
                    user.gender,
                    user.province,
                    user.avatar
                ]
            );
            return (result.affectedRows == 1);
        } catch (error) {
            throw new Error("No se pudo crear el usuario");
        }
    }

    async updateUser(userUpdates, userId) {
        try {
            const connection = await createConnection();

            const fields = Object.keys(userUpdates).filter(key => {
                const value = userUpdates[key];
                return value !== undefined && value !== null && value !== '';
            });

            if (fields.length === 0) {
                return;
            }

            const query = `UPDATE users SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE id = ?`;
            const values = fields.map(field => userUpdates[field]);
            values.push(userId);

            const [result] = await connection.query(query, values);
            return result;
        } catch (error) {
            throw new Error("No se pudo crear el usuario");
        }
    }

    async getUserById(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT * FROM users WHERE id = ?",
                [id]
            );
            return result[0];
        } catch (error) {
            throw new Error("No se pudo obtener el usuario");
        }
    }

    async getUserByUsername(username) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "SELECT * FROM users WHERE username = ?",
                [username]
            );
            return result[0];
        } catch (error) {
            throw new Error("No se pudo obtener el usuario");
        }
    }

    async changePass(password, id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "UPDATE users SET password = ? WHERE id = ?",
                [password, id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo editar la notificacion");
        }
    }

    async deleteUser(id) {
        try {
            const connection = await createConnection();
            const [result] = await connection.query(
                "DELETE FROM users WHERE id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw new Error("No se pudo eliminar el usuario");
        }
    }
}

const usersModel = new Users();
export default usersModel;