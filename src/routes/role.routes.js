const express = require('express');
const roleControllers = require('../controllers/role.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const { roles } = require('../utils/values');;
const { ADMIN, DIRECTOR, HR, MANAGER, EMPLOYEE } = roles

router.get('/getAllRoles', auth.isLogged, auth.checkRole(ADMIN), roleControllers.getAllRoles);
router.patch('/updateRole/:roleId', auth.isLogged, auth.checkRole(ADMIN), roleControllers.updateRole);



module.exports = router;