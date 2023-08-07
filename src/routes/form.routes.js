const express = require('express');
const formControllers = require('../controllers/form.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const { roles } = require('../utils/values');;
const { ADMIN, DIRECTOR, HR, MANAGER, EMPLOYEE } = roles


router.post('/createForm', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formControllers.createForm);
router.patch('/editInfoForm/:formId', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formControllers.editInfoForm);
router.get('/getAllForms', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formControllers.getAllForms);
router.get('/getForm/:formId', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formControllers.getForm);
router.post('/setAllUsers/:formId', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formControllers.setAllUsers);
router.post('/setUsers/:formId', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formControllers.setUsers);
router.get('/getUserOfForm/:formId', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formControllers.getUserOfForm);
router.delete('/deleteForm/:formId', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formControllers.deleteForm);
router.post('/closeForm/:formId', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formControllers.closeForm);
router.post('/openForm/:formId', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formControllers.openForm);
router.get('/report/:formId', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formControllers.report);

//co the cai thien code nay bang cach su dung app.user('forms') o server. xem lai cai nay

module.exports = router;