const db = require('./db.js');
let connection = db();
connection.connect((err) => {
    if (err) return console.log("链接数据库错误：", err);
    console.log("链接数据库成功");
    success();
})
let success = () => {
    connection.query(
        ""
    )
}