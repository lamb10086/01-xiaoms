const db = require("./db.js");
let connection = db();
connection.connect((err) => {
  if (err) return console.log("链接数据库错误：", err);
  console.log("链接数据库成功");
  success();
});
//成功后创建表
function success() {
  connection.query(
    `
    SELECT COUNT(1) FROM information_schema.tables WHERE table_schema = 'test' and table_name = 'KnowLedgeList'`,
    (err, result) => {
      result = JSON.parse(JSON.stringify(result))[0];
      console.log("count", result["COUNT(1)"]);
      if (result["COUNT(1)"]) {
        console.log("已创建表KnowLedgeList");
      } else {
        connection.query(
          `CREATE TABLE test.KnowLedgeList  (
                toDayKnowLedge varchar(255) NOT NULL COMMENT '今日知识',
                PRIMARY KEY (toDayKnowLedge)
            )`,
          (err, result) => {
            if (err) console.log("创建表失败test", err);
          }
        );
      }
    }
  );
}
process.on("message", (data) => {
  window[data.type]();
});
function toDayKnowLedge() {
  connection.query(``);
}

setInterval(() => {
  let text = document.querySelector(".today-con.ft12.mt10");
  let ls=document.querySelector(".c333.ft12.ml5")
  ls.click();
  fetch("")
  console.log(String(text.innerText));
}, 500);
