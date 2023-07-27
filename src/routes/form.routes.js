const express = require('express');
const formControllers = require('../controllers/form.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/createForm', auth.isLogged, formControllers.createForm);
router.patch('/editInfoForm/:formId', auth.isLogged, formControllers.editInfoForm);
router.get('/getAllForms', auth.isLogged, formControllers.getAllForms);
router.get('/getForm/:formId', auth.isLogged, formControllers.getForm);


module.exports = router;