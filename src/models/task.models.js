const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Task = sequelize.define('Task', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        result: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
        
    })
    return Task;
}


