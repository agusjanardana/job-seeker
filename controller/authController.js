const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//error handling
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // check kalau salah email
    if (err.message.includes('salah email')) {
        errors.email = 'Email belum teregistrasi';
    }

    // salah password

    if (err.message.includes('Password Salah')) {
        errors.password = 'Password kurang tepat';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'email sudah teregistrasi';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};
//Create jwt token, aku hanya cantumin id nya.
const maxTime = 1 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxTime,
    });
};

exports.register_get = (req, res) => {
    res.render('auth/register');
};

exports.login_get = (req, res) => {
    res.render('auth/login');
};

exports.register_post = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const user = await User.create({ email, password, name });
        const token = createToken(user._id);
        // dalam cookie, waktu itu harus ms
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxTime * 1000 });
        res.status(200).json({ users: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxTime * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};
