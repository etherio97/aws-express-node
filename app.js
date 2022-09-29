const express = require('express');
const cors = require('cors');
const { PORT } = process.env;

const app = express();

app.use(cors());

app.get('/', (req, res) => res.json({ status: 'OK', message: 'Hello World' }));

app.all('**', (req, res) =>
  res.status(404).json({ status: 'Not Found', message: 'No route match' })
);

app.listen(PORT || 3000, () =>
  console.log('app is running on port: %d', PORT || 3000)
);
