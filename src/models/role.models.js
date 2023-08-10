const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const Role = sequelize.define('Role', {
        name: {
            type: DataTypes.ENUM('ADMIN', 'DIRECTOR', 'MANAGER', 'HR', 'EMPLOYEE'),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return Role
}


