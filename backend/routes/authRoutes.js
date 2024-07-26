const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);

router.post('/login', authController.login);



//will implement later  

// router.post('/reset-password', authController.resetPassword);

module.exports = router;
