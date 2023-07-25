const express = require('express');
const userControllers = require('../controllers/user.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/login', auth.isNotLogged, userControllers.login);
router.get('/viewInfo', auth.isLogged, userControllers.viewInfo);

module.exports = router;