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
router.get('/viewAllForms', auth.isLogged, auth.checkPermission(READ_FORM), viewAllForms
	/**
	 * #swagger.summary = 'User get all forms submit'
	 * #swagger.description = 'User get all forms submit' 
	 * */
);
router.get('/viewForm/:formId', auth.isLogged, viewForm
	/**
	 * #swagger.summary = 'User get form submit by id'
	 * #swagger.description = 'User get form submit by id' 
	 * */
);
router.post('/submit', auth.isLogged, submit
	/**
	 * #swagger.summary = 'Submit form'
	 * #swagger.description = 'User submit form' 
	 * */
);

//boss
router.get('/getFormSubmit/:formId/:userId', auth.isLogged, auth.checkPermission(READ_FORM_SUBMIT), checkAccessForm, getFormSubmit
	/**
	 * #swagger.summary = 'Get a form submit of a user'
	 * #swagger.description = 'Get a form submit of a user' 
	 * */
);
router.get('/getAllFormSubmits', auth.isLogged, auth.checkPermission(READ_FORM_SUBMIT), getAllFormSubmits
	/**
	 * #swagger.summary = 'Get all form submit'
	 * #swagger.description = 'Get all form submit' 
	 * */
);
router.post('/approval', auth.isLogged, auth.checkPermission(APPROVAL_FORM), checkAccessForm, approval
	/**
	 * #swagger.summary = 'Approval a form'
	 * #swagger.description = 'Director approval form manager, manager approval form employee' 
	 * */
);
router.post('/reject', auth.isLogged, auth.checkPermission(REJECT_FORM), checkAccessForm,reject
	/**
	 * #swagger.summary = 'Reject a form'
	 * #swagger.description = 'Director reject form manager, manager reject form employee' 
	 * */
);



module.exports = router;
