const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize, User, Form) => {
    const FormSubmit = sequelize.define('FormSubmit', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
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
            allowNull: false,
            defaultValue: 'NEW',
        }
    })
    return FormSubmit
}