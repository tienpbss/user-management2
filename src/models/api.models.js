const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Api = sequelize.define('Api', {
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return Api

}


