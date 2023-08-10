const { User, Role } = require('../../models');
const { roles } = require('../values');
const { ADMIN, DIRECTOR, MANAGER, HR, EMPLOYEE} = roles;

/*

DIRECTOR 1

HR MANAGER ADMIN 2

EMPLOYEE 3

*/
const hierarchical = {
    DIRECTOR: 1,
    ADMIN: 2,
    MANAGER: 2,
    HR: 2,
    EMPLOYEE: 3
}

//check role can access form of userId
/**
 * 
 * @param {string[]} roles 
 * @param {number} userId 
 * @returns 
 */
const canAccessFormOfUser = async (roles, userId) => {
    const userOfForm = await User.findByPk(userId, {
        attributes: [],
        include: Role
    })
    const pointForm = userOfForm.Roles.map(e => hierarchical[e.name]);
    const pointUser = roles.map(e => hierarchical[e]);
    if (Math.min(...pointUser) < Math.min(...pointForm)){
        return true;
    }
    return false;
}

module.exports = canAccessFormOfUser