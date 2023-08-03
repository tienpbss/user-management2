const express = require('express');
const roleControllers = require('../controllers/role.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/getAllRoles', auth.isLogged, roleControllers.getAllRoles);
router.patch('/updateRole/:roleId', auth.isLogged, roleControllers.updateRole);



module.exports = router;