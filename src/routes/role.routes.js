const express = require('express');
const roleControllers = require('../controllers/role.controllers');
const router = express.Router();

router.get('/getAllRoles', roleControllers.getAllRoles);



module.exports = router;