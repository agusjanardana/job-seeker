const express = require('express');
const mongoose = require('mongoose');

const app = express();

//get route
const mainRoutes = require('./routes/authRoutes');

// middleware
app.use(express.static('public'));
//express json membuat tidak perluu sequilize
app.use(express.json());

// view engine
app.set('view engine', 'ejs');
require('dotenv').config();

// database connection

mongoose
   .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
   })
   .then(() => console.log('mongoDB Connected'))
   .catch((err) => console.log(err));
// routes
app.use('/', mainRoutes);

app.listen(3000, function () {
   console.log('Server listening on port' + 3000);
});
