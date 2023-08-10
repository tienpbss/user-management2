const { Role, Permission } = require('../models');

const getAllRoles = async (req, res) => {
    const roles = await Role.findAll({
        attributes: ['id', 'name']
    });
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

const setPermissions = async (req, res) => {
    const { roleName, permissions } = req.body;
    const role = await Role.findOne({
        where: {
            name: roleName,
        }
    })
    if (!role){
        res.status(404).json('Not found Role')
    }
    const set = await Permission.findAll({
        where: {
            name: permissions,
        }
    });
    const result = await role.setPermissions(set);
    res.json({
        result,
        message: 'set permissions for roles'
    })
}

const viewDetail = async (req, res) => {
    const { name } = req.params;
    const role = await Role.findOne({
        where: {
            name
        },
        include: Permission,
    })
    res.json({
        role
    })
}

module.exports = {
    getAllRoles,
    updateRole,
    setPermissions,
    viewDetail,
}