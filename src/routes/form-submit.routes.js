const express = require('express');
const formSubmitControllers = require('../controllers/form-submit.controllers');

const auth = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/saveForm', formSubmitControllers.saveForm)




module.exports = router;