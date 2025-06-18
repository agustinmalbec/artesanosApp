import albumsModel from "../models/albums.model.js";
import albumsImagesModel from "../models/albumsImages.model.js";
import notificationsModel from "../models/notifications.model.js";

class AlbumsController {
    constructor() {
        this.model = albumsModel;
    }

    albums = async (req, res) => {
        try {
            const user = req.user;
            const notifications = await notificationsModel.getNotificationsByUser(req.user.id);
            let notis = 0;
            for (const not of notifications) {
                if (not.status) {
                    notis++;
                }
            }
            const albums = await this.model.getAlbumByUser(req.user.id);
            res.render('albums', { title: 'Albums', albums, userId: user.id, notis, notifications });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    createAlbum = async (req, res) => {
        try {
            const album = req.body;
            await this.model.createAlbum(album);
            res.redirect('/albums');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };


    getAlbumById = async (req, res) => {
        try {
            const notifications = await notificationsModel.getNotificationsByUser(req.user.id);
            let notis = 0;
            for (const not of notifications) {
                if (not.status) {
                    notis++;
                }
            }
            const album = await this.model.getAlbumById(req.params.id);
            const images = await albumsImagesModel.getAlbumImageByAlbum(req.params.id);
            res.render('album', { title: 'Album', album, images, notis, notifications });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    deleteAlbum = async (req, res) => {
        try {
            await this.model.deleteAlbum(req.params.id);
            res.redirect('/albums');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

export const albumsController = new AlbumsController();