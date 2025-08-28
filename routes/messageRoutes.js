const express = require('express');
const router = express.Router();

const {
    sendAMessage,
    viewChatHistory,
    viewAllMessagesBetweenAllUsers
} = require('../controllers/messageController');

router.route('/sendmessage').post(sendAMessage);
router.route('/chathistory').get(viewChatHistory);
router.route('/allchats').get(viewAllMessagesBetweenAllUsers);

module.exports = router;