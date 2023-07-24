const pool = require('../configs/connectDB.configs');


class User {
    static async findByEmail(email) {
        try{
            const [rows, fields] = pool.execute('SELECT * FROM user where email = ?', [email]);
            return rows;
        }
        catch(error){
            console.log(error);
        }
    }

    static async findById(id) {
        try{
            const [rows, fields] = pool.execute('SELECT * FROM user where id = ?', [id]);
            return rows
        }
        catch(error){
            console.log(error);
        }
    }

}