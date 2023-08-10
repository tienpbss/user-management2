const { canAccessFormOfUser } = require('../utils/functions')
/**
 * @type {import("express").RequestHandler}
*/
const checkAccessForm = async (req, res, next) => {
    const user = req.user;
    const userId = req.params.userId || req.body.userId;
    const roles = user.Roles.map(e => e.name);
    const check = await canAccessFormOfUser(roles, userId)
    if (check) {
        return next();
    }
    return res.status(403).json({ error: 'You can not access this form' })
}

module.exports = checkAccessForm