const pool = require('../configs/connectDB.configs');
const formServices = require('../services/form.services')


const createForm = async (req, res) => {
    const {
        category_id,
        due_date,
        description,
        name
    } = req.body;
    const result = await formServices.createForm(category_id, due_date, description, name);
    res.json({
        result,
        message: 'created new form'
    })
}

const editInfoForm = async (req, res) => {
    const formId = req.params.formId;
    const {
        due_date,
        description,
        name
    } = req.body;
    const result = await formServices.editInfoForm(formId, due_date, description, name);
    res.json({
        result,
        message: 'edited info of form'
    })
}

const getAllForms = async (req, res) => {
    const forms = await formServices.getAllForms();
    res.json({
        forms
    })
}

const getForm = async (req, res) => {
    const formId = req.params.formId;
    const form = await formServices.getFormById(formId);
    res.json({
        form
    })
}





module.exports = {
    createForm,
    editInfoForm,
    getAllForms,
    getForm
}




