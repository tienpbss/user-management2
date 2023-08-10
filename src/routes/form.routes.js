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

router.post('/createForm', auth.isLogged, auth.checkPermission(CREATE_FORM), createForm);
router.patch('/editInfoForm/:formId', auth.isLogged, auth.checkPermission(UPDATE_FORM), editInfoForm);
router.get('/getAllForms', auth.isLogged, auth.checkPermission(READ_FORM), getAllForms);
router.get('/getForm/:formId', auth.isLogged, auth.checkPermission(READ_FORM), getForm);
router.post('/setAllUsers/:formId', auth.isLogged, auth.checkPermission(UPDATE_FORM), setAllUsers);
router.post('/setUsers/:formId', auth.isLogged, auth.checkPermission(UPDATE_FORM), setUsers);
router.get('/getUserOfForm/:formId', auth.isLogged, auth.checkPermission(READ_FORM), getUserOfForm);
router.delete('/deleteForm/:formId', auth.isLogged, auth.checkPermission(DELETE_FORM), deleteForm);
router.post('/closeForm/:formId', auth.isLogged, auth.checkPermission(UPDATE_FORM), closeForm);
router.post('/openForm/:formId', auth.isLogged, auth.checkPermission(UPDATE_FORM), openForm);
router.get('/report/:formId', auth.isLogged, auth.checkPermission(CREATE_FORM), report);

//co the cai thien code nay bang cach su dung app.user('forms') o server. xem lai cai nay

module.exports = router;