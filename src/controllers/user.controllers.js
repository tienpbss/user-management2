const jwt= require('jsonwebtoken')

const pool = require('../configs/connectDB.configs')
const bcrypt = require('bcrypt');
const role_user = require('../utils/values/roles')


const login = async (req, res) => {
    const { email, password } = req.body;
    const [users] = await pool.query('SELECT * FROM `user` WHERE `email`=?', [email]);
    if (users.length === 0){
        throw new Error('User not found');
    }
    const user = users[0];
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword){
        throw new Error('Wrong password');
    }
    const jwtToken = jwt.sign(user.id, process.env.JWT_KEY, )
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
//  `isactivate` boolean default true,
// 	PRIMARY KEY (`id`)
// );


module.exports = {
    login,
    viewInfo,
}