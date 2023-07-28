const jwt= require('jsonwebtoken')
const bcrypt = require('bcrypt');
const role_user = require('../utils/values/roles');

const { sequelize, User, Role } = require('../models');
const { saltRounds } = require('../configs/hashPW.configs');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: { email }
    });
    if (!user) {
        throw Error('Not found user with that email')
    }
    const comparePassword = bcrypt.compare(password, user.password);
    if (!comparePassword){
        throw Error('Wrong password');
    }
    const jwtToken = jwt.sign(user.id, process.env.JWT_KEY, );
    res.json({
        jwtToken
    })
}

const viewInfo = async (req, res) => {
    const user = req.user;
    res.json({
        user
    })
}

const editInfo = async (req, res) => {
    const user = req.user;
    const {
        email,
        password,
        firstName,
        lastName,
        dob,
        phone,
        cmnd,
        bhxh,
        address,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const userEdited = await User.update({
        email,
        password: hashPassword,
        firstName,
        lastName,
        dob,
        phone,
        cmnd,
        bhxh,
        address, 
    },
    {
        where: {
            id: user.id
        }
    })
    res.json({
        message: "Edited info ",
    })   
}

const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json({
        users
    })
}

const getUser = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId, {
        include: Role
    });
    if (!user){
        throw Error('User not found');
    }
    res.json({
        message: 'Return user',
        user
    })
}

const addUser = async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName,
        dob,
        phone,
        cmnd,
        bhxh,
        address,
        roles
    } = req.body;
    if (!email || !password || !firstName || !lastName || !dob || !phone || !cmnd || !bhxh || !address || !roles){
        throw Error('Missing fields')
    }
    // Ma nhan vien mac dinh la date.now don vi giay
    const mnv = Math.floor(Date.now() / 1000);
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const t = await sequelize.transaction();
    try {
        const user = await User.create({
            mnv,
            email,
            password: hashPassword,
            firstName,
            lastName,
            dob,
            phone,
            cmnd,
            bhxh,
            address,
        }); 
        const result = await user.setRoles(roles);
        await t.commit();
        res.json({
            message: 'Added user',
            user,
            result
        })        
    } catch (error) {
        console.error(error);
        res.json({
            error: error.message,
        })
        await t.rollback();
    }

}

const editUser = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user){
        throw Error('User not found');
    }
    const {
        mnv,
        email,
        password,
        firstName,
        lastName,
        dob,
        phone,
        cmnd,
        bhxh,
        address,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    await User.update({
        mnv,
        email,
        password: hashPassword,
        firstName,
        lastName,
        dob,
        phone,
        cmnd,
        bhxh,
        address, 
    },
    {
        where: {
            id: userId
        }
    })
    res.json({
        message: "Edited user"
    })
}

const editStatusUser = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user){
        throw Error('User not found');
    }
    const { status } = req.body;
    await User.update({
        activate: status,
    },
    {
        where: {
            id: userId
        }
    })
    res.json({
        message: "Edited status of user"
    })
}

const editRoleUser = async (req, res) => {
    const userId = req.params.userId;
    const roles = req.body.roles;
    const user = await User.findByPk(userId);
    if (!user){
        throw Error('User not found');
    }
    const resultSet = await user.setRoles(roles);
    res.json({
        message: "edited role",
        resultSet
    })
}



module.exports = {
    login,
    viewInfo,
    editInfo,
    getAllUsers,
    getUser,
    addUser,
    editUser,
    editStatusUser,
    editRoleUser,
}