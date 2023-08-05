const jwt = require('jsonwebtoken');
const { roles } = require('../utils/values')

const { User, Role } = require('../models')
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

const checkRole = (...roleRequire) => {
    return (req, res, next) => {
        const user = req.user;
        const roleUser = user.Roles.map(e => e.name);
        for (let role of roleRequire){
            if (roleUser.includes(role)){
                return next();
            }
        }
        res.json({ error: 'Access denied'})
    }
}

module.exports = {
    isLogged,
    isNotLogged,
    checkRole
}