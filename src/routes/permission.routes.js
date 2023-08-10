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

router.get('/getAllPermissions', auth.isLogged, auth.checkPermission(READ_PERMISSION), getAllPermissions);
router.get('/viewPermission/:permissionId', auth.isLogged, auth.checkPermission(READ_PERMISSION), viewPermission);

module.exports = router;