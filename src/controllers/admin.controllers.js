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
}