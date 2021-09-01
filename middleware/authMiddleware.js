const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
    // const token = req.cookies.jwt; //cookie

    // bearer
    const authHeader = req.header.authorization;
    const token = authHeader.split(' ')[1];
    //check jika punya token
    // if (token) {
    //     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    //         if (err) {
    //             console.log(err.message);
    //             res.redirect('/login');
    //         } else {
    //             console.log(decodedToken);
    //             next();
    //         }
    //     });
    // } else {
    //     res.redirect('/login');
    // }
    try {
        if (!token) {
            throw new Error('unauthenticaed');
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        return next();
    } catch (error) {
        res.locals.user = null;
        return res.status(401).json({ 'status': 'error', 'message': 'Unautheticated' });
    }
};

// const checkUser = async (req, res, next) => {
//     const token = req.cookies.jwt;

//     //check jika punya token
//     try {
//         if (!token) {
//             throw new Error('unauthenticaed');
//         }

//         const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
//         let user = await User.findById(decodedToken.id);
//         res.locals.user = user;
//         return next();
//     } catch (error) {
//         res.locals.user = null;
//         return res.status(401).json({ 'status': 'error', 'message': 'Unautheticated' });
//     }

// if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//         if (err) {
//             console.log(err.message);
//             res.locals.user = null;
//             next();
//         } else {
//             // console.log(decodedToken);
//             let user = await User.findById(decodedToken.id);
//             res.locals.user = user;
//             next();
//         }
//     });
// } else {
//     res.locals.user = null;
//     next();
//     return res.json({ 'status': 'error', 'message': 'Unautheticated' }).code(401);
// }
// };
module.exports = { requireAuth };
