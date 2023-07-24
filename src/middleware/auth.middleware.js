const jwt = require('jsonwebtoken');

const pool = require('../configs/connectDB.configs')

const isLogged = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const jwtToken = authorizationHeader.split(' ')[1];
    const payload = jwt.verify(jwtToken, process.env.JWT_KEY);
    const userId = payload.id
    const [users, fields] = await pool.execute('SELECT * FROM `user` WHERE `id`=?', [payload.id]);
    if (users.length === 0){
        throw Error('Can not found user with this token')
    }
    const user = users[0];
    user.roles = [];
    user.permissions = [];
    let sql = 'select `role`.`name` as role_name, `role`.`name` as roleId '+
        'from `user_role` '+
        'inner join `role` '+
        'on `user_role`.role_id = `role`.id '+
        'where user_role.user_id = ?; '
    let [rolesOfUser] = await pool.execute(sql, [userId]);
    for (let i of rolesOfUser){
        user.roles.push(i.role_name);
    }
    res.send(user)
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