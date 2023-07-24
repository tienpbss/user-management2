const pool = require('./configs/connectDB.configs');

const main = async () => {
    const a = await pool.query(
        "INSERT INTO `user_management`.`user` (`manv`, `email`, `password`, `firstname`, `lastname`) VALUES (?, ?, ?, ?, ?)",
        ['1', 'b@b', '1', undefined, undefined]);
    console.log(a);
}

main()

