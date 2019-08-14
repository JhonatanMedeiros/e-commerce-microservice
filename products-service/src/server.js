import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
const app = express();

import routes from './routes';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.use(routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Micro Service - Product listening on port ${PORT}!`));
