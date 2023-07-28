const { Role } = require('../models');

const getAllRoles = async (req, res) => {
    const roles = await Role.findAll();
    res.json({
        message: 'Get roles successful',
        roles
    })
}


module.exports = {
    getAllRoles
}