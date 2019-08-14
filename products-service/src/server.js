import express from 'express';
const app = express();

import routes from './routes';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Micro Service - Product listening on port ${PORT}!`));
