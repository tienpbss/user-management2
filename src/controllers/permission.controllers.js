const { Permission } = require('../models');

const getAllPermissions = async (req, res) => {
    const permissions = await Permission.findAll({
        attributes: ['id', 'name'],
        order: ['id']
    });
    res.json({
        permissions
    })
}

const viewPermission = async (req, res) => {
    const { permissionId } = req.params;
    const permission = await Permission.findByPk(permissionId);
    res.json({
        permission
    })
}

module.exports = {
    getAllPermissions,
    viewPermission,
}
