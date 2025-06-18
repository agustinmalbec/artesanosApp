import albumsModel from "../models/albums.model.js";
import albumsImagesModel from "../models/albumsImages.model.js";
import commentsModel from "../models/comments.model.js";
import imagesModel from "../models/images.model.js";
import notificationsModel from "../models/notifications.model.js";

class ImagesController {
    constructor() {
        this.model = imagesModel;
    }

    getImages = async (req, res) => {
        try {
            const albums = await albumsModel.getAlbumByUser(req.user.id);
            const notifications = await notificationsModel.getNotificationsByUser(req.user.id);
            let notis = 0;
            for (const not of notifications) {
                if (not.status) {
                    notis++;
                }
            }
            res.render('uploadImages', { title: 'Sube imagenes', userId: req.user.id, albums, notis, notifications });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    createImage = async (req, res) => {
        try {
            const data = req.body;
            const image = req.file;
            const newPath = image.path.split("\\public\\");
            data.url = newPath[1];
            const { result, id } = await this.model.createImage(data);
            if (!result) {
                return res.status(400).json({ message: 'No se pudo crear la imagen' });
            }
            const relationship = await albumsImagesModel.createRelationship(data.albumId, id);
            if (!relationship) {
                return res.status(400).json({ message: 'No se pudo crear la relacion' });
            }

            res.redirect(`/images`);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    getImageById = async (req, res) => {
        try {
            const image = await this.model.getImageById(req.params.id);
            const comments = await commentsModel.getCommentsByImage(req.params.id);
            const idUser = req.user.id;
            const notifications = await notificationsModel.getNotificationsByUser(idUser);
            let notis = 0;
            for (const not of notifications) {
                if (not.status) {
                    notis++;
                }

            }
            res.render('image', { title: 'Image', image, idUser, comments, notis, notifications });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    shareImage = async (req, res) => {
        try {
            await this.model.shareImage(req.params.id);
            const album = req.body;
            res.redirect(`/albums/${album.id_album}`);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    deleteImage = async (req, res) => {
        try {
            await this.model.deleteImage(req.params.id);
            res.redirect('/albums');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

export const imagesController = new ImagesController();