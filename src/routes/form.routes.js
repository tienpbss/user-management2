const express = require('express');
const formControllers = require('../controllers/form.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/createForm', auth.isLogged, formControllers.createForm);
router.patch('/editInfoForm/:formId', auth.isLogged, formControllers.editInfoForm);
router.get('/getAllForms', auth.isLogged, formControllers.getAllForms);
router.get('/getForm/:formId', auth.isLogged, formControllers.getForm);
router.post('/setAllUsers/:formId', auth.isLogged, formControllers.setAllUsers);
router.post('/setUsers/:formId', auth.isLogged, formControllers.setUsers);
router.get('/getUserOfForm/:formId', auth.isLogged, formControllers.getUserOfForm);
router.delete('/deleteForm/:formId', auth.isLogged, formControllers.deleteForm);
router.post('/closeForm/:formId', auth.isLogged, formControllers.closeForm);
router.post('/openForm/:formId', auth.isLogged, formControllers.openForm);
router.post('/report', auth.isLogged, formControllers.report);

module.exports = router;