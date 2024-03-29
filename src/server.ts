
import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/routes';
import cors from 'cors';
import uploadConfig from './config/upload';

import './database';

dotenv.config();

const app = express();

app.use(express.static('public'));
app.use('/files', express.static(uploadConfig.directory));
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
    console.log('Server started at port: 3333');
})