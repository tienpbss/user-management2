const express = require('express');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const { permissions } = require('../utils/values');;
const {
    CREATE_FORM,
    UPDATE_FORM,
    READ_FORM,
    DELETE_FORM
} = permissions

const {
    createForm,
    editInfoForm,
    getAllForms,
    getForm,
    setAllUsers,
    setUsers,
    getUserOfForm,
    deleteForm,
    closeForm,
    openForm,
    report
} = require('../controllers/form.controllers');

router.post('/createForm', auth.isLogged, auth.checkPermission(CREATE_FORM), createForm
	/**
	 * #swagger.summary = 'Create a new form'
	 * #swagger.description = 'Create a new form' 
	 * */
);
router.patch('/editInfoForm/:formId', auth.isLogged, auth.checkPermission(UPDATE_FORM), editInfoForm
	/**
	 * #swagger.summary = 'Edit an exist form'
	 * #swagger.description = 'Edit an exist form' 
	 * */
);
router.get('/getAllForms', auth.isLogged, auth.checkPermission(READ_FORM), getAllForms
	/**
	 * #swagger.summary = 'Get all forms'
	 * #swagger.description = 'Get all forms' 
	 * */
);
router.get('/getForm/:formId', auth.isLogged, auth.checkPermission(READ_FORM), getForm
	/**
	 * #swagger.summary = 'Get form by id'
	 * #swagger.description = 'Get form by id' 
	 * */
);
router.post('/setAllUsers/:formId', auth.isLogged, auth.checkPermission(UPDATE_FORM), setAllUsers
	/**
	 * #swagger.summary = 'Set form for all user'
	 * #swagger.description = 'Set form for all user' 
	 * */
);
router.post('/setUsers/:formId', auth.isLogged, auth.checkPermission(UPDATE_FORM), setUsers
	/**
	 * #swagger.summary = 'Set forms for specific users'
	 * #swagger.description = 'Set forms for specific users' 
	 * */
);
router.get('/getUserOfForm/:formId', auth.isLogged, auth.checkPermission(READ_FORM), getUserOfForm
	/**
	 * #swagger.summary = 'Get specific users of form'
	 * #swagger.description = 'Get specific users of form' 
	 * */
);
router.delete('/deleteForm/:formId', auth.isLogged, auth.checkPermission(DELETE_FORM), deleteForm
	/**
	 * #swagger.summary = 'Delete form by id'
	 * #swagger.description = 'Delete form by id' 
	 * */
);
router.post('/closeForm/:formId', auth.isLogged, auth.checkPermission(UPDATE_FORM), closeForm
	/**
	 * #swagger.summary = 'Close form'
	 * #swagger.description = 'Close form' 
	 * */
);
router.post('/openForm/:formId', auth.isLogged, auth.checkPermission(UPDATE_FORM), openForm
	/**
	 * #swagger.summary = 'Open form'
	 * #swagger.description = 'Open form' 
	 * */);
router.get('/report/:formId', auth.isLogged, auth.checkPermission(CREATE_FORM), report
	/**
	 * #swagger.summary = 'Report of a form'
	 * #swagger.description = 'See users whose form is in new, pending, approval status. Pass status in query' 
	 * */
);

//co the cai thien code nay bang cach su dung app.user('forms') o server. xem lai cai nay

module.exports = router;