import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get('/login', async (req, res) => {
    try {
        res.render('login', {
            title: 'Inicia sesion'
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/registro', async (req, res) => {
    try {
        res.render('register', {
            title: 'Registrate'
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

viewsRouter.get('/error', async (req, res) => {
    try {
        res.render('error', { title: 'Error' });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default viewsRouter;