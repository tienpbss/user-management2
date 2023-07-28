const jwt = require('jsonwebtoken');

const { User, Role } = require('../models')
const isLogged = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        throw Error('Missing token');
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
    if (!user.activate){
        throw Error('User is no longer active');
    }
    req.user = user;
    next();
}

const isNotLogged = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        throw new Error('You are logged');
    }
    next();
}



module.exports = {
    isLogged,
    isNotLogged
}