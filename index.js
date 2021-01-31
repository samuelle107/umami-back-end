const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
require('dotenv').config();
require('./database');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use('/recipes', routes.recipes);
app.use('/tags', routes.tags);

app.listen(process.env.PORT, () => {
  console.log(`The server has started on port: ${process.env.PORT}`);
});
