const { Form, Task, User, FormSubmit, FormCategory, sequelize } = require('../models');
const formSubmitStatus = require('../utils/values/form-submit-status');
const { Op } = require("sequelize");

const viewAllForms = async (req, res) => {
    const user = req.user;
    const { status } = req.query;
    console.log(req.query)
    console.log(status);
    const formSubmits = await user.getForms({
        include: [{ model: FormCategory }]
    });
    let forms = await formSubmits.map((e) => {
        return {
            formId: e.id,
            name: e.name,
            description: e.description,
            dueDate: e.dueDate,
            status: e.status,
            category: e.FormCategory.name,
            statusSubmit: e.FormSubmit.status,
        }
    })
    if (status) {
        forms = forms.filter(e => {
            return e.statusSubmit == status;
        })
    }
    res.json({
        forms,
        message: "return list form of user"
    })
}

const viewForm = async (req, res) => {
    const user = req.user;
    const formId = req.params.formId;
    const formUser = await FormSubmit.findOne({
        where: {
            UserId: user.id,
            FormId: formId
        },
        include: Task
    })
    res.json({
        message: "return form-user",
        formUser
    })
}

const submit = async (req, res) => {
    const user = req.user;
    let {
        formId,
        tasks,
        user_comment
    } = req.body;
    const formUser = await FormSubmit.findOne({
        where: {
            UserId: user.id,
            FormId: formId
        }
    })
    try {
        const result = sequelize.transaction(async (t) => {
            await formUser.setTasks([], { transaction: t });
            for (let task of tasks) {
                await formUser.createTask(task, { transaction: t })
            }
            formUser.set({
                user_comment,
                status: formSubmitStatus.PENDING,
            })
            await formUser.save({ transaction: t })
            res.json({
                message: 'this form is submitted'
            })
        })
    } catch (error) {
        console.error(error);
        res.json({
            error: 'Error when submit'
        })
    }
}


//get form submit of user
const getFormSubmit = async (req, res) => {
    const { formId, userId } = req.params;
    const formUser = await FormSubmit.findOne({
        where: {
            UserId: userId,
            FormId: formId
        },
        include: Task
    })
    res.json({
        message: "return form-user for boss",
        formUser
    })
}

const getAllFormSubmits = async (req, res) => {
    const { status } = req.query;
    if (status != formSubmitStatus.PENDING && status != formSubmitStatus.APPROVAL){
        throw Error('status not allow')
    }
    let filter = {
        status: { [Op.or]: [formSubmitStatus.PENDING, formSubmitStatus.APPROVAL] },
    };
    if (status) {
        filter.status = status
    }
    const formUsers = await FormSubmit.findAll({
        where: filter
    });
    res.json({
        message: "all form-submits of user",
        formUsers,
    })
}


const approval = async (req, res) => {
    const { userId, formId, manager_comment } = req.body;
    const formUser = await FormSubmit.findOne({
        where: {
            UserId: userId,
            FormId: formId
        }
    })
    formUser.set({
        status: formSubmitStatus.APPROVAL,
        manager_comment
    })
    await formUser.save();
    res.json({
        message: 'approval form',
    })
}

const reject = async (req, res) => {
    const { userId, formId } = req.body;
    const formUser = await FormSubmit.findOne({
        where: {
            UserId: userId,
            FormId: formId
        }
    })
    formUser.set({
        status: formSubmitStatus.NEW,
        manager_comment
    })
    await formUser.save();
    res.json({
        message: 'reject form',
    })
}



module.exports = {
    viewAllForms,
    viewForm,
    getFormSubmit,
    getAllFormSubmits,
    submit,
    approval,
    reject
}
