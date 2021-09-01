const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

//get route
const mainRoutes = require('./routes/authRoutes');
const { checkUser } = require('./middleware/authMiddleware.js');

/*
 *middleware
 */
app.use(express.static('public'));
//express json membuat tidak perluu sequilize
app.use(express.json());
app.use(cookieParser());

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

app.get('/set-cookies', (req, res) => {
    //  res.setHeader('Set-Cookie', 'newUser=true');

    res.cookie('newUser', false, { maxAge: 1000 * 60 * 60 * 24 });
    res.send('got the cookies');
});

app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
});
