const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Form = sequelize.define('Form', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false 
        },
        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: false 
        },
        status: {
            type: DataTypes.ENUM('OPEN', 'CLOSED'),
            defaultValue: 'OPEN'
        }
    })
    return Form;
}

