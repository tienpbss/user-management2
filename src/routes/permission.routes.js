const express = require('express');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const { permissions } = require('../utils/values');;
const {
    READ_PERMISSION
} = permissions
const {
    getAllPermissions,
    viewPermission,
} = require('../controllers/permission.controllers')

router.get('/getAllPermissions', auth.isLogged, auth.checkPermission(READ_PERMISSION), getAllPermissions
	/**
	 * #swagger.summary = 'Get all permissions'
	 * #swagger.description = 'Get all permissions' 
	 * */
);
router.get('/viewPermission/:permissionId', auth.isLogged, auth.checkPermission(READ_PERMISSION), viewPermission
	/**
	 * #swagger.summary = 'Get detail permission'
	 * #swagger.description = 'Get detail(name, des) of permission' 
	 * */
);

module.exports = router;