const express = require('express');
const auth = require('../middleware/auth.middleware');
const checkAccessForm = require('../middleware/access-form.middleware')
const router = express.Router();
const { permissions } = require('../utils/values');;
const {
    READ_FORM,
    READ_FORM_SUBMIT,
    SUBMIT_FORM,
    APPROVAL_FORM,
    REJECT_FORM
} = permissions

const {
    viewAllForms,
    viewForm,
    getFormSubmit,
    getAllFormSubmits,
    submit,
    approval,
    reject,
} = require('../controllers/form-submit.controllers');

//user
router.get('/viewAllForms', auth.isLogged, auth.checkPermission(READ_FORM), viewAllForms);
router.get('/viewForm/:formId', auth.isLogged, viewForm);
router.post('/submit', auth.isLogged, submit);

//boss
router.get('/getFormSubmit/:formId/:userId', auth.isLogged, auth.checkPermission(READ_FORM_SUBMIT), checkAccessForm, getFormSubmit);
router.get('/getAllFormSubmits', auth.isLogged, auth.checkPermission(READ_FORM_SUBMIT), getAllFormSubmits);
router.post('/approval', auth.isLogged, auth.checkPermission(APPROVAL_FORM), checkAccessForm, approval);
router.post('/reject', auth.isLogged, auth.checkPermission(REJECT_FORM), checkAccessForm,reject);



module.exports = router;
