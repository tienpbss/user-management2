const express = require('express');
const adminControllers = require('../controllers/admin.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();


router.get('/getAllUsers', auth.isLogged, adminControllers.getAllUsers);
router.post('/addUser', auth.isLogged, adminControllers.addUser);

module.exports = router;