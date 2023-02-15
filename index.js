const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./util/db');
const User = require('./models/user');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

//testing your route
app.get('/', (req, res, next) => {
  res.send('Hi from root route !!');
});

//CRUD routes
app.use('/users', require('./routes/users'));

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

//syncing your db
sequelize
  .sync()
  .then(result => {
    console.log("Database connected");
    app.listen(3000);
  })
  .catch(err => console.log(err));
