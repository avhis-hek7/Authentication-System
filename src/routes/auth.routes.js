const express = require('express');
const authContoller = require('../controllers/auth.controller');


const router = express.Router();
router.post('/register',authContoller.userRegisterController);

router.post('/login',authContoller.loginController);

router.get('/get-me',authContoller.getMeUseUserController);

router.get('/refresh-token', authContoller.refreshTokenController);

router.get('/logout',authContoller.logoutController);

router.get('/logoutall',authContoller.logoutAllController);

module.exports = router;