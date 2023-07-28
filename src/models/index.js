const Sequelize = require("sequelize");

const UserModel = require('./user.models');
const RoleModel = require('./role.models');
const FormCategoryModel = require('./form-category.models');
const FormModel = require('./form.models');
const FormSubmitModel = require('./form-submit');
const TaskModel = require('./task.models');

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

//model
const User = UserModel(sequelize);
const Role = RoleModel(sequelize);
const Form = FormModel(sequelize);
const FormCategory = FormCategoryModel(sequelize);
const Task = TaskModel(sequelize);
const FormSubmit = FormSubmitModel(sequelize, User, Form);

// 1 - n
FormCategory.hasMany(Form);
Form.belongsTo(FormCategory);

FormSubmit.hasMany(Task);
Task.belongsTo(FormSubmit);

//m - n
User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

User.belongsToMany(Form, { through: FormSubmit });
Form.belongsToMany(User, { through: FormSubmit });



sequelize.sync({ force: false })
    .then(() => {
        console.log('re-sync done!');
    })
    .catch((error) => {
        console.error('re-sync failed');
        console.error(error);
    })


module.exports = {
    sequelize,
    User,
    Role,
    FormCategory,
    Form,
    Task,
    FormSubmit,
}

