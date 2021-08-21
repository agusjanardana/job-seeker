const User = require('../models/User');

//error handling
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

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

exports.register_get = (req, res) => {
    res.render('auth/register');
};

exports.login_get = (req, res) => {
    res.render('auth/login');
};

exports.register_post = async (req, res) => {
    const { email, password, name } = req.body;

    // if (!req.body) {
    //    res.status(400).send({
    //       message: 'Ada field yang kosong',
    //    });
    // }
    try {
        const user = await User.create({ email, password, name });
        res.status(200).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

exports.login_post = (req, res) => {
    const { email, password } = req.body;
    res.send('login success');
};
