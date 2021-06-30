import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import usersController from './controllers/users.js';
import postController from './controllers/posts.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(usersController);
app.use(postController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
