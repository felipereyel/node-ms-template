import express from 'express';
import cors from 'cors';

import { enableGracefulShutdown } from './utils';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/healthcheck', (_, res) => res.status(200).send(null));

app.get('/', (_, res) => res.send('OK'));

const server = app.listen(port, () => console.log(`Listening on port ${port}`));
enableGracefulShutdown(server);
