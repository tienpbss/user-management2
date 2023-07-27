
const pool = require('../configs/connectDB.configs');

async function createForm(category_id, due_date, description, name){
    const createFormSql = 'insert into `form` (`category_id`, `due_date`, `description`, `name`) '+
        'values(?, ?, ?, ?);'
    const [result] = await pool.execute(createFormSql, [
        category_id,
        due_date, 
        description,
        name
    ]);
    return result;
}

async function editInfoForm(formId, due_date, description, name){
    const editInfoSql = 'UPDATE `form` '+
        'SET `due_date` = ?, `description` = ?, `name` = ? '+
        'WHERE `id`=?;'
    const [result] = await pool.execute(editInfoSql, [
        due_date, 
        description,
        name,
        formId
    ]);
    return result;
}

async function getAllForms(){
    const getAllFormsSql = 'SELECT * FROM form'
    const [forms] = await pool.execute(getAllFormsSql);
    return forms
}

async function getFormById(formId){
    const getAllFormsSql = 'SELECT * FROM form WHERE id=?'
    const [forms] = await pool.execute(getAllFormsSql, [formId]);
    return forms[0] 
}


module.exports = {
    createForm,
    editInfoForm,
    getAllForms,
    getFormById
}