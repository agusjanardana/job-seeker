var router = require('express').Router();
const jwt = require('jsonwebtoken');
const authController = require('../controller/authController.js');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const User = require('../models/User');
/** Disini adalah route untuk views
 * @method GET
 */
// router.get('*', checkUser);

router.get('/register', authController.register_get);
router.post('/registered', authController.register_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

router.post('/verify', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ status: 'error' });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decodedToken.id);
    user.password = '';
    return res.status(200).json({
        data: user,
    });
});

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/job', requireAuth, (req, res) => {
    res.render('job');
});
module.exports = router;
