import dotenv from 'dotenv';

const environment = '.env';
dotenv.config({
    path: environment
});

export default {
    DB_LINK: process.env.DB_LINK,
    SECRET_KEY: process.env.SECRET_KEY,
    KEY: process.env.KEY,
    PORT_DB: process.env.PORT_DB,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    HOST_DB: process.env.HOST_DB,
    USER_DB: process.env.USER_DB,
    PASSWORD_DB: process.env.PASSWORD_DB,
    DATABASE: process.env.DATABASE,
    PORT: process.env.PORT
};