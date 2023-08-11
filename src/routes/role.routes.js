const express = require('express');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const { permissions } = require('../utils/values');;
const {
    READ_ROLE,
    UPDATE_ROLE
} = permissions
const {
    getAllRoles,
    updateRole,
    setPermissions,
    viewDetail,
} = require('../controllers/role.controllers');

router.get('/getAllRoles', auth.isLogged, auth.checkPermission(READ_ROLE), getAllRoles
	/**
	 * #swagger.summary = 'Get all roles'
	 * #swagger.description = 'Get all roles of system' 
	 * */
);
router.patch('/updateRole/:roleId', auth.isLogged, auth.checkPermission(UPDATE_ROLE), updateRole
	/**
	 * #swagger.summary = 'Change info of role'
	 * #swagger.description = 'Change name, description of role' 
	 * */
);
router.post('/setPermissions', auth.isLogged, auth.checkPermission(UPDATE_ROLE), setPermissions
	/**
	 * #swagger.summary = 'Set permissions for role'
	 * #swagger.description = 'Set permission for role' 
	 * */
);
router.get('/viewDetail/:name', auth.isLogged, auth.checkPermission(READ_ROLE), viewDetail
	/**
	 * #swagger.summary = 'Get role by name'
	 * #swagger.description = 'View detail(name, des, permission) of role' 
	 * */
);

module.exports = router;