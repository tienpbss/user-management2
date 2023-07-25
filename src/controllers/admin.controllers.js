const jwt= require('jsonwebtoken')

const pool = require('../configs/connectDB.configs')
const bcrypt = require('bcrypt');
const role_user = require('../utils/values/roles')

//nhan cac gia tri tu req, trong do role la mot mang cac role_id
const addUser = async (req, res) => {
    const {
        email,
        password,
        firstname,
        lastname,
        dob,
        phone,
        cmnd,
        bhxh,
        address,
        roles
    } = req.body;
    // Ma nhan vien mac dinh la date.now don vi giay
    const manv = Math.floor(Date.now() / 1000);
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    try{
        await pool.query('START TRANSACTION')
        const sql = 'INSERT INTO user (manv, email, password, firstname, lastname, dob, phone, cmnd, bhxh, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result, fields] = await pool.execute(sql, [manv, email, hashPassword, firstname, lastname, dob, phone, cmnd, bhxh, address])
        const userRoleAdded = [];
        const userId = result.insertId;
        for (let role of roles){
            const add_user_role_sql = 'INSERT INTO `user_role`(user_id, role_id) VALUES (?, ?)';
            const [user_role, fields] = await pool.execute(add_user_role_sql, [userId, role]);
            userRoleAdded.push(user_role);
        }
        const [user, fields2] = await pool.execute('SELECT * FROM `user` WHERE id=?', [userId]);
        await pool.query('COMMIT');
        res.json({
            result: 'added user',
            user,
            userRoleAdded
        })        
    }
    catch(error){
        console.log(error);
        await pool.query('ROLLBACK');
        res.status(500).json({ error: 'Error adding user' })
    }

}

const getAllUsers = async (req, res) => {
    const sql = 'SELECT * FROM user';
    const [users, fields] = await pool.execute(sql);
    res.json({ users })
}

const getUser = async (req, res) => {
    const userId = req.params.userId;
    const [users] = await pool.execute('SELECT * FROM `user` WHERE id=?', [userId]);
    if (users.length == 0) {
        throw Error('User not found');
    }
    const user = users[0];
    res.json({
        user
    })
}

const editUser = async (req, res) => {
    const userId = req.params.userId;
    const {
        manv,
        email,
        password,
        firstname,
        lastname,
        dob,
        phone,
        cmnd,
        bhxh,
        address,
        isactivate,
        roles
    } = req.body;
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    try{
        await pool.query('START TRANSACTION');
        const editQuery = "UPDATE `user` " +
            "SET manv = ?, email= ?, `password`=?, `firstname`=?, `lastname`=?, `dob`=?, `phone`=?, `cmnd`=?, `bhxh`=?, `address`=?, `isactivate`=? "+
            "WHERE id = ?;"
        const [result] = await pool.execute(
            editQuery,
            [
                manv,
                email,
                hashPassword,
                firstname,
                lastname,
                dob,
                phone,
                cmnd,
                bhxh,
                address,  
                isactivate,
                userId
            ]
        )
        await pool.execute('DELETE FROM `user_role` WHERE user_id=?;', [userId]);
        for (let role of roles){
            const add_user_role_sql = 'INSERT INTO `user_role`(user_id, role_id) VALUES (?, ?);';
            await pool.execute(add_user_role_sql, [userId, role]);
        }
        await pool.query('COMMIT');
        res.json({
            message: "Edited user"
        })
    }
    catch(error){
        console.log(error);
        await pool.query('ROLLBACK');
        res.status(500).json({ error: 'Error edit user' })
    }


}

const deActivateUser = async (req, res) => {
    const userId = req.params.userId;
    await pool.execute('UPDATE `user` SET `isactivate`=0 WHERE id=?;', [userId]);
    res.json({
        message: 'Deactivate user'
    })
}

// CREATE TABLE `user` (
// 	`id` INT NOT NULL AUTO_INCREMENT,
// 	`manv` varchar(255) NOT NULL,
// 	`avatar` varchar(255),
// 	`email` varchar(255) NOT NULL UNIQUE,
// 	`password` varchar(255) NOT NULL,
// 	`firstname` varchar(255),
// 	`lastname` varchar(255),
// 	`dob` varchar(255),
// 	`phone` varchar(255),
// 	`cmnd` varchar(255),
// 	`bhxh` varchar(255),
// 	`address` varchar(255),
// 	PRIMARY KEY (`id`)
// );


module.exports = {
    addUser,
    getAllUsers,
    getUser,
    editUser,
    deActivateUser,
}