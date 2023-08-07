const express = require('express');
const formSubmitControllers = require('../controllers/form-submit.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const { roles } = require('../utils/values');;
const { ADMIN, DIRECTOR, HR, MANAGER, EMPLOYEE } = roles

//user
router.get('/viewAllForms', auth.isLogged, formSubmitControllers.viewAllForms);
router.get('/viewForm/:formId', auth.isLogged, formSubmitControllers.viewForm);
router.post('/submit', auth.isLogged, formSubmitControllers.submit);

//boss
router.get('/getFormSubmit/:formId/:userId', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formSubmitControllers.getFormSubmit);
router.get('/getAllFormSubmits', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formSubmitControllers.getAllFormSubmits);
router.post('/approval', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formSubmitControllers.approval);
router.post('/reject', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formSubmitControllers.reject);
router.post('/reports', auth.isLogged, auth.checkRole(ADMIN, DIRECTOR, HR, MANAGER), formSubmitControllers.reject);



module.exports = router;