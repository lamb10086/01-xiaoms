const db = require("./db.js");
const fs = require("fs");
const sqlName = require("../api/sqlName");
let connection = db();
function connectFirst() {
  connection.connect((err) => {
    if (err) return console.log("链接数据库错误：", err);
    console.log("链接数据库成功");
    success();
    initToDayKnowLedge();
  });
}
//连接成功创建表
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

  //插入数据库
  // fs.readFile("../xmsJs/test.txt", "utf-8", (err, data) => {
  //   if (err) {
  //     console.log("读取失败", err);
  //   } else {
  //     data = data.split("\n");
  //     console.log("读取成功");
  //     for (let i = 0; i < data.length; i++) {
  //       insertToDayKnowLedge(data[i]);
  //     }
  //   }
  // });
}
//

//插入
function insertToDayKnowLedge(data) {
  connection.query(
    `
    INSERT INTO  KnowLedgeList(toDayKnowLedge) VALUES(?)`,
    [data],
    (err, result) => {
      if (err) {
        console.log("插入失败", err);
      } else {
        console.log("插入成功", result);
      }
    }
  );
}
function toDayKnowLedge() {}
module.exports = {
  connectFirst,
};
//初始化表
function initToDayKnowLedge() {
  let ls;
  connection.query("SELECT COUNT(*) FROM KnowLedgeList;", (err, data) => {
    if (err) {
      console.log("初始化查询失败", err);
    } else {
      console.log("初始化查询成功", data);
      ls = data;
    }
  });
  if (ls != 0) return;
  connection.query(
    "LOAD DATA LOCAL INFILE 'C:/Users/yangp/Desktop/test.txt' INTO TABLE KnowLedgeList;",
    (err, data) => {
      if (err) {
        console.log("导入失败", err);
      } else {
        console.log("导入成功", data);
      }
    }
  );
}

function queryToDayKnowLedge(res) {
  try {
    connection.query("select * from KnowLedgeList order by rand() limit 1;", (err, data) => {
      if (err) {
        console.log("查询KnowLedgeList失败", err);
      } else {
        console.log("查询KnowLedgeList成功", data);
        res.json({
          data: {
            data: data[0],
          },
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
}
process.on("message", (data) => {
  if (data.type === "successMove") {
    connectFirst();
  }
  if (data.type === "queryToDayKnowLedge") {
    queryToDayKnowLedge(res);
    console.log("data", data);
  }
});
