const express = require('express');
const router = express.Router();

const {register,login,getAllusers} = require('../controllers/userController');
// const {authenticationMiddleware} = require('../middleware/authenticationmiddleware');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/').get(getAllusers);


module.exports = router;