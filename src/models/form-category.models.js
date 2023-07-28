const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const FormCategory = sequelize.define('FormCategory', {
        name: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false 
        }
    })    
    return FormCategory;
}




