const express = require('express');
const userControllers = require('../controllers/user.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/login', auth.isNotLogged, userControllers.login);
router.get('/viewInfo', auth.isLogged, userControllers.viewInfo);
router.patch('/editInfo', auth.isLogged, userControllers.editInfo);


router.get('/getAllUsers', auth.isLogged, userControllers.getAllUsers);
router.get('/getUser/:userId', auth.isLogged, userControllers.getUser);
router.post('/addUser', userControllers.addUser);
// router.post('/addUser', auth.isLogged, adminControllers.addUser);
router.patch('/editUser/:userId', auth.isLogged, userControllers.editUser);
router.patch('/editStatusUser/:userId', auth.isLogged, userControllers.editStatusUser);
router.post('/editRoleUser/:userId', auth.isLogged, userControllers.editRoleUser);

module.exports = router;