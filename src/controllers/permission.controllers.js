const { Permission } = require('../models');

const getAllPermissions = async (req, res) => {
    const { page = 0 } = req.query;
    const elementPerPage = 10;
    const pagination = {
        limit: elementPerPage,
        offset: page*elementPerPage
    }
    const permissions = await Permission.findAll({
        attributes: ['id', 'name'],
        order: ['id'],
        ...pagination
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
