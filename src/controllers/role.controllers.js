const { Role } = require('../models');

const getAllRoles = async (req, res) => {
    const roles = await Role.findAll();
    res.json({
        message: 'Get roles successful',
        roles
    })
}

const updateRole = async (req, res) => {
    const { description } = req.body;
    const roleId = req.params.roleId;
    const role = await Role.findByPk(roleId);
    if (!role){
        throw Error('Role not found');
    }
    role.description = description;
    await role.save();
    res.json({
        message: 'Role updated'
    })
}


module.exports = {
    getAllRoles,
    updateRole
}