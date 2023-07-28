const { DataTypes } = require('sequelize');

module.exports = (sequelize, User, Form) => {
    const FormSubmit = sequelize.define('FormSubmit', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }, 
        user_comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        manager_comment: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.ENUM('NEW', 'PENDING', 'APPROVAL'),
            allowNull: false
        }
    })
    return FormSubmit
}