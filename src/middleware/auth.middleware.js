const jwt = require('jsonwebtoken');

const { User, Role, Permission } = require('../models')
const isLogged = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Missing token' });
    }
    const jwtToken = authorizationHeader.split(' ')[1];
    const payload = jwt.verify(jwtToken, process.env.JWT_KEY);
    const userId = payload.id
    const user = await User.findOne( {
        where: {
            id: userId
        },
        include: Role
    } )
    if (!user || !user.activate) {
        return res.status(401).json({ error: 'User is not active or not found' });
    }
    req.user = user;
    next();
}

const isNotLogged = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        return res.status(403).json({ error: 'You are already logged in' });
    }
    next();
}

const checkPermission = (require) => {
    return async (req, res, next) => {
        const roleNames = req.user.Roles.map(e => e.name);
        const permissions = [];
        for (let name of roleNames){
            const role = await Role.findOne({
                    where: {
                        name
                    },
                    include: Permission
                }
            )
            role.Permissions.forEach(e => {
                permissions.push(e.name)
            });
        }
        if (permissions.includes(require)){
            return next();
        }
        res.status(403).json({ error: 'Access denied'})
    }
}

module.exports = {
    isLogged,
    isNotLogged,
    checkPermission
}