
const { Form, User, FormCategory, sequelize } = require('../models');
const sendMail = require('../utils/send-mail');

const createForm = async (req, res) => {
    const {
        categoryId,
        dueDate,
        description,
        name
    } = req.body;

    const formCategory = await FormCategory.findByPk(categoryId);
    const form = await formCategory.createForm({
        name,
        description,
        dueDate
    });

    res.json({
        form,
        message: 'created new form'
    })
}

const editInfoForm = async (req, res) => {
    const formId = req.params.formId;
    const {
        dueDate,
        description,
        name
    } = req.body;
    const form = await Form.findByPk(formId);
    form.set({
        name,
        description,
        dueDate
    })
    await form.save();
    res.json({
        form,
        message: 'edited info of form'
    })
}

const getAllForms = async (req, res) => {
    const forms = await Form.findAll();
    res.json({
        forms
    })
}

const getForm = async (req, res) => {
    const formId = req.params.formId;
    const form = await Form.findByPk(formId);
    if (!form) {
        throw Error('Form not found');
    }
    res.json({
        form
    })
}

const setAllUsers = async (req, res) => {
    const formId = req.params.formId;
    const form = await Form.findByPk(formId);
    const allUsers = await User.findAll({
        where: {
            activate: true,
        },
        attributes: ['id', 'email']
    });
    const allUserIds = allUsers.map(e => e.id);
    const result = await form.setUsers(allUserIds);

    let emails = allUsers.map(e => e.email);
    const category = await FormCategory.findByPk(form.FormCategoryId);
    await sendMail(category.name, emails);
    res.json({
        result,
        message: 'Set this form for all users',
    })
}

const setUsers = async (req, res) => {
    const { userIds } = req.body;
    const formId = req.params.formId;
    const emails = [];
    for (let i of userIds){
        const user = await User.findByPk(i);
        if (!user){
            throw Error(`Not found user with id: ${i}`);
        }
        emails.push(user.email);
    }
    const form = await Form.findByPk(formId);
    const result = await form.setUsers(userIds);
    const category = await FormCategory.findByPk(form.FormCategoryId);
    await sendMail(category.name, emails);
    
    res.json({
        result,
        message: 'Set this form for specific users',
    })
}

const getUserOfForm = async (req, res) => {
    const formId = req.params.formId;
    const form = await Form.findByPk(formId);
    const users = await form.getUsers();
    res.json({
        users,
        message: "List users of form"
    })
}

const deleteForm = async (req, res) => {
    const formId = req.params.formId;
    const form = await Form.findByPk(formId);
    const formDelete = await Form.destroy({
        where: {
          id: formId
        }
      });
    res.json({
        formDelete,
        message: 'Deleted 1 form'
    })
}

const closeForm = async (req, res) => {
    const { formId } = req.params;
    const form = Form.findByPk(formId);
    if (!form) {
        throw Error('Form not found');
    }
    form.status = formStatus.CLOSED;
    await form.save();
    res.json({
        message: 'closed form'
    })
}

const openForm = async (req, res) => {
    const { formId } = req.params;
    const form = Form.findByPk(formId);
    if (!form) {
        throw Error('Form not found');
    }
    form.status = formStatus.OPEN;
    await form.save();
    res.json({
        message: 'open form'
    })
}

module.exports = {
    createForm,
    editInfoForm,
    getAllForms,
    getForm,
    setAllUsers,
    setUsers,
    getUserOfForm,
    deleteForm,
    closeForm,
    openForm
}




