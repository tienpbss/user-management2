
const { Form, User, FormCategory, sequelize, FormSubmit } = require('../models');
const { sendEmail } = require('../utils/functions');
const { formCategory, formSubmitStatus } = require('../utils/values');

const createForm = async (req, res) => {
    const {
        categoryId,
        dueDate,
        description,
        name
    } = req.body;

    if (!categoryId || !dueDate || !description || !name) {
        return res.status(400).json({ error: 'Missing fields' })
    }

    const formCategory = await FormCategory.findByPk(categoryId);
    const form = await formCategory.createForm({
        name,
        description,
        dueDate
    });

    res.status(201).json({
        form,
        message: 'Created a new form'
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
    if (!form) {
        return res.status(404).json({ error: 'Form not found' });
    }
    form.set({
        name,
        description,
        dueDate
    })
    await form.save();
    res.json({
        form,
        message: 'Edited form information'
    })
}

const getAllForms = async (req, res) => {
    const { page = 0 } = req.query;
    const elementPerPage = 10;
    const pagination = {
        limit: elementPerPage,
        offset: page*elementPerPage
    }
    const forms = await Form.findAll({
        ...pagination
    });
    res.json({
        forms
    })
}

const getForm = async (req, res) => {
    const formId = req.params.formId;
    const form = await Form.findByPk(formId);
    if (!form) {
        return res.status(404).json({ error: 'Form not found' });
    }
    res.json({
        form
    })
}

const setAllUsers = async (req, res) => {
    const formId = req.params.formId;
    const form = await Form.findByPk(formId);
    if (!form) {
        return res.status(404).json({ error: 'Form not found' });
    }
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
    await sendEmail(category.name, emails);
    res.json({
        result,
        message: 'Set this form for all users',
    })
}

const setUsers = async (req, res) => {
    const { userIds } = req.body;
    const formId = req.params.formId;
    const emails = [];
    for (let i of userIds) {
        const user = await User.findByPk(i);
        if (!user) {
            res.status(404).json({ error: 'User not found' })
        }
        emails.push(user.email);
    }
    const form = await Form.findByPk(formId);
    if (!form) {
        return res.status(404).json({ error: 'Form not found' });
    }
    const result = await form.setUsers(userIds);
    const category = await FormCategory.findByPk(form.FormCategoryId);
    await sendEmail(category.name, emails);

    res.json({
        result,
        message: 'Set this form for specific users',
    })
}

const getUserOfForm = async (req, res) => {
    const formId = req.params.formId;
    const { page = 0 } = req.query;
    const elementPerPage = 10;
    const pagination = {
        limit: elementPerPage,
        offset: page*elementPerPage
    }
    const form = await Form.findByPk(formId,{
        ...pagination
    });
    if (!form) {
        return res.status(404).json({ error: 'Form not found' });
    }
    const users = await form.getUsers();
    res.json({
        users,
        message: "List users of form"
    })
}

const deleteForm = async (req, res) => {
    const formId = req.params.formId;
    const form = await Form.findByPk(formId);
    if (!form) {
        return res.status(404).json({ error: 'Form not found' });
    }
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
        return res.status(404).json({ error: 'Form not found' });
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
        return res.status(404).json({ error: 'Form not found' });
    }
    form.status = formStatus.OPEN;
    await form.save();
    res.json({
        message: 'open form'
    })
}

const report = async (req, res) => {
    const formId = req.params.formId;
    const status = req.query.status;

    if (!Object.keys(formSubmitStatus).includes(status)) {
        res.status(400).json({ error: 'Status not valid' });
    }

    const form = await Form.findByPk(formId, {
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                through: {
                    where: {
                        status
                    }
                }
            }

        ]
    })
    res.json({ form });
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
    openForm,
    report
}




