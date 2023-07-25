const express = require('express');
const userControllers = require('../controllers/user.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/login', auth.isNotLogged, userControllers.login);
router.get('/viewInfo', auth.isLogged, userControllers.viewInfo);
router.patch('/editInfo', auth.isLogged, userControllers.editInfo);

module.exports = router;