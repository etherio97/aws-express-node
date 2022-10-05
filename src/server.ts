import cors from 'cors';
import express, { json } from 'express';
import { PORT } from './config';
import { db } from './database';
import router from './routes';

const app = express();

app.use(cors());

app.use(json());

app.use(router);

app.all('*', (req, res) => res.status(404).json({ error: 'Not Found' }));

db.connect().then(() => {
  app.listen(PORT, () =>
    console.log('app is running on http://localhost:%s', PORT)
  );
});
