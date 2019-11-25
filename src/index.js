import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import userRoutes from './routes/users';
import { notFoundMiddleware, handleErrorsMiddleware } from './helpers/errorMiddleware';

import { CORS } from './helpers/cors';

import './database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(CORS);

app.use('/users', userRoutes);

app.use(notFoundMiddleware);
app.use(handleErrorsMiddleware);

app.listen(PORT, () => console.log(`Server listning on ${PORT}`));

export default app;
