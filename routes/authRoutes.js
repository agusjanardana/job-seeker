var router = require('express').Router();

const authController = require('../controller/authController.js');

/** Disini adalah route untuk views
 * @method GET
 */

router.get('/register', authController.register_get);
router.post('/registered', authController.register_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/', (req, res) => {
    res.render('home');
});
router.get('/job', (req, res) => {
    res.render('job');
});
module.exports = router;
