const express = require('express');
const authContoller = require('../controllers/auth.controller');


const router = express.Router();
router.post('/register',authContoller.userRegisterController);

router.get('/get-me',authContoller.getMeUseUserController);


module.exports = router;