
const pool = require('../configs/connectDB.configs');


async function insertTask(user_form_id, task, result) {
    const createSql = 'INSERT INTO `user_form_detail` (`user_form_id`, `task`, `result`) value(?,?,?);';
    const [result] = await pool.execute(createSql, [user_form_id, task, result])
    return result;
}


module.exports = {
    insertTask
}