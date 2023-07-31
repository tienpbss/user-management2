const express = require('express');
const formSubmitControllers = require('../controllers/form-submit.controllers');
const auth = require('../middleware/auth.middleware');
const router = express.Router();

//user
router.get('/viewAllForms', auth.isLogged, formSubmitControllers.viewAllForms);
router.get('/viewForm/:formId', auth.isLogged, formSubmitControllers.viewForm);
router.post('/submit', auth.isLogged, formSubmitControllers.submit);

//boss
router.get('/getFormSubmit/:formId/:userId', auth.isLogged, formSubmitControllers.getFormSubmit);
router.get('/getAllFormSubmits', auth.isLogged, formSubmitControllers.getAllFormSubmits);
router.post('/approval', auth.isLogged, formSubmitControllers.approval);
router.post('/reject', auth.isLogged, formSubmitControllers.reject);


module.exports = router;