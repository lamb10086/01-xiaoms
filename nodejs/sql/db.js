const mysql = require('mysql');
module.exports = (database = "test") => {
    database = database || 'test';
    return mysql.createConnection({
        host: 'localhost',
        port: "3306",
        user: "root", //用户名
        password: "123456", //密码
        database, //数据库
    })
}