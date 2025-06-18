import mysql from 'mysql2/promise';
import environment from './environment.config.js';

export const createConnection = async () => {
    const connection = mysql.createPool({
        port: environment.PORT_DB,
        host: environment.HOST_DB,
        user: environment.USER_DB,
        password: environment.PASSWORD_DB,
        database: environment.DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    return connection;
};
