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

router.get('/getAllRoles', auth.isLogged, auth.checkPermission(READ_ROLE), getAllRoles);
router.patch('/updateRole/:roleId', auth.isLogged, auth.checkPermission(UPDATE_ROLE), updateRole);
router.post('/setPermissions', auth.isLogged, auth.checkPermission(UPDATE_ROLE), setPermissions);
router.get('/viewDetail/:name', auth.isLogged, auth.checkPermission(READ_ROLE), viewDetail);

module.exports = router;