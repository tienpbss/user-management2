const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const Role = sequelize.define('Role', {
        name: {
            type: DataTypes.ENUM('ADMIN', 'DIRECTOR', 'MANAGER', 'HR', 'EMPLOYEE'),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Role

}


