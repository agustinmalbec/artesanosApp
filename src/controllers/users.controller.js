import usersModel from "../models/users.model.js";
import { createHash, isValidPassword } from "../config/utils.js";
import { generateToken } from "../middlewares/jwt.middleware.js";
import notificationsModel from "../models/notifications.model.js";
import friendsModel from "../models/friends.model.js";
import imagesModel from "../models/images.model.js";
import albumsModel from "../models/albums.model.js";
import commentsModel from "../models/comments.model.js";

class UsersController {
    constructor() {
        this.model = usersModel;
    }

    getAllUsers = async (req, res) => {
        try {
            const users = await this.model.getAllUsers();
            const notifications = await notificationsModel.getNotificationsByUser(req.user.id);
            let notis = 0;
            for (const not of notifications) {
                if (not.status) {
                    notis++;
                }
            }
            res.render('people', { users, user: req.user.id, notis, notifications });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    createUser = async (req, res) => {
        try {
            const user = req.body;
            user.password = createHash(user.password);
            const file = req.file;
            const newPath = file.path.split("\\public\\");
            user.avatar = newPath[1];
            const created = await this.model.createUser(user);
            if (!created) {
                return res.status(400).json({ message: 'No se pudo crear el usuario' });
            }
            res.redirect('/login');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    updateUser = async (req, res) => {
        try {
            const user = req.body;
            if (req.file) {
                const file = req.file;
                const newPath = file.path.split("\\public\\");
                user.avatar = newPath[1];
            }
            const updated = await this.model.updateUser(user, req.params.id);
            if (!updated) {
                return res.status(400).json({ message: 'No se pudo crear el usuario' });
            }
            res.redirect('/users/logout');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    auth = async (req, res) => {
        try {
            const user = req.body;
            const existingUser = await this.model.getUserByUsername(user.username);
            if (!existingUser) {
                return res.render('error', { message: 'El usuario no esta registrado o la contraseña es incorrecta' });
            }
            if (!isValidPassword(existingUser, user.password)) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
            const token = generateToken(existingUser);
            res.cookie('jwt', token,
                {
                    maxAge: 6000000,
                    httpOnly: true
                }
            ).redirect('/users/perfil');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };


    logout = async (req, res) => {
        try {
            res.clearCookie('jwt').redirect('/login');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    profile = async (req, res) => {
        try {
            const user = req.user;
            const notifications = await notificationsModel.getNotificationsByUser(user.id);
            const friends = await friendsModel.getFriendsById(user.id);
            const images = await imagesModel.getImagesByUser(user.id);
            const albums = await albumsModel.getAlbumByUser(user.id);
            let comments = 0;
            for (const image of images) {
                let com = await commentsModel.getCommentsByImage(image.id);
                comments += com.length;
            }
            const stats = {
                images: images.length,
                albums: albums.length,
                comments: comments
            };
            let notis = 0;
            for (const not of notifications) {
                if (not.status) {
                    notis++;
                }

            }
            res.render('profile', { title: 'Perfil', user, notifications, friends, stats, notis });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    changePass = async (req, res) => {
        try {
            const { password } = req.body;
            await this.model.changePass(createHash(password), req.params.id);
            res.redirect('/users/logout');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export const usersController = new UsersController();