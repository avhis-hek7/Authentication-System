const express = require('express');
const authContoller = require('../controllers/auth.controller');


const router = express.Router();
router.post('/register',authContoller.userRegisterController);

router.get('/get-me',authContoller.getMeUseUserController);

router.get('/refresh-token', authContoller.refreshTokenController);

module.exports = router;