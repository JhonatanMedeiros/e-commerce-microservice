const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.get('/ping', (req, res) => {
  res.send('Products Service');
});

app.listen(PORT, function () {
  console.log(`Micro Service - Product listening on port ${PORT}!`);
});
