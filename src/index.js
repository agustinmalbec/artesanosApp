import express from 'express';
import { engine } from 'express-handlebars';
import usersRouter from './routers/users.router.js';
import viewsRouter from './routers/views.router.js';
import cors from 'cors';
import notificationsRouter from './routers/notifications.router.js';
import imagesRouter from './routers/images.router.js';
import friendsRouter from './routers/friends.router.js';
import commentsRouter from './routers/comments.router.js';
import albumsRouter from './routers/albums.router.js';
import cookieParser from 'cookie-parser';
import { app, server } from './config/webSocket.js';
import eventsRouter from './routers/events.router.js';
import tagsRouter from './routers/tags.router.js';
import environment from './config/environment.config.js';

app.engine('handlebars', engine({
    helpers: {
        compare: (a, b) => a === b
    }

}));
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/', viewsRouter);
app.use('/users', usersRouter);
app.use('/notifications', notificationsRouter);
app.use('/images', imagesRouter);
app.use('/friends', friendsRouter);
app.use('/comments', commentsRouter);
app.use('/albums', albumsRouter);
app.use('/events', eventsRouter);
app.use('/tags', tagsRouter);

app.get('*path', (req, res) => {
    res.redirect('/users/perfil');
});

const PORT = environment.PORT;

server.listen(PORT, () => {
    console.log(`Conectado al puerto ${PORT}`);
});