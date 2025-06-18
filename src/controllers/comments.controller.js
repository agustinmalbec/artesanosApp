import commentsModel from "../models/comments.model.js";

class CommentsController {
    constructor() {
        this.model = commentsModel;
    }

    getComments = async (req, res) => {
        try {

            res.render('turnos', { turnos, pacientes, meEs, clinicas });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    createComment = async (req, res) => {
        try {
            const comment = req.body;
            const image = req.params.id;
            comment.id_image = image;
            await this.model.createComment(comment);
            res.redirect(`/images/${image}`);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

export const commentsController = new CommentsController();