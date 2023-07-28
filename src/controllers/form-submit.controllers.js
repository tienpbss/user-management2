const formSubmitServices = require('../services/form-submit.services');

const saveForm = async (req, res) => {
    const user = req.user;
    const {
        formId,
        userComment,
        listTask
    } = req.body

    res.send('ss')
}

module.exports = {
    saveForm 
}