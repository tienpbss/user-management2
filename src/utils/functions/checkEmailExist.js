const { User } = require('../../models');
const { Op } = require('sequelize')

const checkEmailExist = async (email, userId = null) => {
    const emailExists = await User.findOne({
        where: {
            email,
            id: {
                [Op.not]: userId
            }
        }
    })
    return emailExists ? true : false;
}

module.exports = checkEmailExist