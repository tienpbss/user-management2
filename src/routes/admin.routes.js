const express = require('express');
const adminControllers = require('../controllers/admin.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();


router.get('/getAllUsers', auth.isLogged, adminControllers.getAllUsers);
router.get('/getUser/:userId', auth.isLogged, adminControllers.getUser);

router.post('/addUser', adminControllers.addUser);
// router.post('/addUser', auth.isLogged, adminControllers.addUser);

router.put('/editUser/:userId', auth.isLogged, adminControllers.editUser);
router.patch('/deActivateUser/:userId', auth.isLogged, adminControllers.deActivateUser);

module.exports = router;