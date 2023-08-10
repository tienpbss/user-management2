const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const role_user = require('../utils/values/roles');
const { checkEmailExist } = require('../utils/functions')
const { sequelize, User, Role } = require('../models');
const { saltRounds } = require('../configs/hashPW.configs');
const { Op } = require('sequelize');

/** @type {import("express").RequestHandler} */
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: { email }
    });
    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            error: 'Wrong password'
        })
    }
    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_KEY,);
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
        firstName,
        lastName,
        dob,
        phone,
        cmnd,
        bhxh,
        address,
    } = req.body;

    const emailExists = await checkEmailExist(email, user.id)
    if (emailExists){
        return res.status(400).json({ error: 'Email already exists'});
    }

    user.set({
        email,
        firstName,
        lastName,
        dob: new Date(dob),
        phone,
        cmnd,
        bhxh,
        address,
    })
    await user.save();
    res.json({
        message: 'Info edited successfully',
    })
}

const editPassword = async (req, res) => {
    const user = req.user;
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Missing password' });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashPassword;
    await user.save();
    res.json({ message: 'Password edited successfully' })
}

const updateAvatar = async (req, res) => {
    const user = req.user;
    if (user.avatar) {
        const avatarPath = path.join(process.cwd(), user.avatar);
        if (fs.existsSync(avatarPath)) {
            fs.unlinkSync(avatarPath);
        }

    }
    const avatar = req.file ? req.file.path : null;
    user.avatar = avatar;
    await user.save();
    res.json({
        message: 'upload avatar success'
    })
}

const getAvatar = async (req, res) => {
    const user = req.user;
    if (!user.avatar) {
        return res.send(null)
    }
    const avatarPath = path.join(process.cwd(), user.avatar);
    if (!fs.existsSync(avatarPath)) {
        return res.send(null)
    }

    res.sendFile(avatarPath);
}

const getAvatarUser = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId, {
        attributes: ['avatar']
    })
    if (!user.avatar) {
        return res.status(404).json({ error: "Avatar not found" });
    }
    const avatarPath = path.join(process.cwd(), user.avatar);
    if (!fs.existsSync(avatarPath)) {
        return res.status(404).json({ error: "Avatar not found" });
    }

    res.sendFile(avatarPath);


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
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({
        message: 'User returned successfully',
        user
    });
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
    if (!email || !password || !firstName || !lastName || !dob || !phone || !cmnd || !bhxh || !address || !roles) {
        return res.status(400).json({ error: 'Missing fields' })
    }

    const emailExist = await checkEmailExist(email);
    if (emailExist){
        return res.status(400).json({ error: 'Email already exists'});
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
            dob: new Date(dob),
            phone,
            cmnd,
            bhxh,
            address,
        });
        const result = await user.setRoles(roles);
        await t.commit();
        return res.status(201).json({
            message: 'User added successfully',
            user,
            result
        })
    } catch (error) {
        console.error('Add user error:', error);
        await t.rollback();
        return res.status(500).json({ error: 'An error occurred while adding user' });
    }

}

const editUser = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }
    const {
        mnv,
        email,
        firstName,
        lastName,
        dob,
        phone,
        cmnd,
        bhxh,
        address,
    } = req.body;
    if (!mnv || !email || !firstName || !lastName || !dob || !phone || !cmnd || !bhxh || !address) {
        return res.status(400).json({ error: 'Missing fields' })
    }

    const emailExists = await checkEmailExist(email, userId);
    if (emailExists){
        return res.status(400).json({ error: 'Email already exists'});
    }

    await User.update({
        mnv,
        email,
        firstName,
        lastName,
        dob: new Date(dob),
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
        message: 'User edited successfully'
    })
}

const editPasswordUser = async (req, res) => {
    const userId = req.params.userId;
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Missing password' });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.findByPk(userId);
    user.password = hashPassword;
    await user.save();
    res.json({ message: 'Password edited successfully' })
}

const editStatusUser = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: 'Missing status' });
    }
    await User.update({
        activate: status,
    },
        {
            where: {
                id: userId
            }
        })
    res.json({
        message: "User status edited successfully"
    })
}

const editRoleUser = async (req, res) => {
    const userId = req.params.userId;
    const roles = req.body.roles;
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ Error: 'User not found' });
    }
    const resultSet = await user.setRoles(roles);
    res.json({
        message: "User roles edited successfully",
        resultSet
    })
}



module.exports = {
    login,
    viewInfo,
    editInfo,
    editPassword,
    updateAvatar,
    getAvatar,
    getAvatarUser,
    getAllUsers,
    getUser,
    addUser,
    editUser,
    editPasswordUser,
    editStatusUser,
    editRoleUser,
}