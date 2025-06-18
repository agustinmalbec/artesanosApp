import albumsModel from "../models/albums.model.js";
import albumsImagesModel from "../models/albumsImages.model.js";
import friendsModel from "../models/friends.model.js";
import imagesModel from "../models/images.model.js";
import notificationsModel from "../models/notifications.model.js";
import usersModel from "../models/users.model.js";

class FriendsController {
    constructor() {
        this.model = friendsModel;
    }

    getFriends = async (req, res) => {
        try {

            res.render('turnos', { turnos, pacientes, meEs, clinicas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    createFriend = async (req, res) => {
        try {
            const request = req.body;
            if (request.action == 'accept') {
                const userRecives = await usersModel.getUserById(request.id_user_to);
                const imagesShared = await imagesModel.getImagesByUser(request.id_user_to);
                const album = {
                    id_user: request.id_user_from,
                    title: userRecives.first_name + ' ' + userRecives.last_name,
                    description: `Album de imagenes de ${userRecives.first_name} ${userRecives.last_name}`,
                };
                await this.model.createFriend(request);
                const { result, id } = await albumsModel.createAlbum(album);
                if (!result) {
                    return res.status(400).json({ message: 'No se pudo crear el album' });
                }

                for (const image of imagesShared) {
                    if (image.featured) {
                        await albumsImagesModel.createRelationship(id, image.id);
                    }
                }
                await notificationsModel.deleteNotification(req.params.id);
            } else {
                await notificationsModel.deleteNotification(req.params.id);
            }
            res.redirect('/users/perfil');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    getFriendsById = async (req, res) => {
        try {
            const friends = await this.model.getFriendsById(req.params.id);
            res.send(friends);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    deleteFriend = async (req, res) => {
        try {
            await this.model.deleteFriend(req.params.id);
            res.redirect('/users/perfil');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

export const friendsController = new FriendsController();