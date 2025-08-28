const express = require('express');
const router = express.Router();

const {register,login,allusers} = require('../controllers/userController');
// const {authenticationMiddleware} = require('../middleware/authenticationmiddleware');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/allusers').get(allusers);

module.exports = router;