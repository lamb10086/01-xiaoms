const db = require("./db.js");
const fs = require("fs");
const sqlName = require("../api/sqlName");
let connection = db();
let lsList = ["禁吃", "慎吃", "可吃"];

function connectFirst() {
  connection.connect((err) => {
    if (err) return console.log("链接数据库错误：", err);
    console.log("链接数据库成功");
    success();
  });
}
//连接成功创建表
function success() {
  //创建表KnowLedgeList
  connection.query(
    `
    SELECT COUNT(1) FROM information_schema.tables WHERE table_schema = 'test' and table_name = 'KnowLedgeList'`,
    (err, result) => {
      result = JSON.parse(JSON.stringify(result))[0];
      console.log("count", result["COUNT(1)"]);
      if (result["COUNT(1)"]) {
        console.log("已创建表KnowLedgeList");
        init(
          "SELECT COUNT(*) FROM KnowLedgeList;",
          "LOAD DATA LOCAL INFILE 'C:/Users/yangp/Desktop/01-xiaoms/nodejs/xmsJs/test.txt' INTO TABLE KnowLedgeList;"
        );
      } else {
        connection.query(
          `CREATE TABLE test.KnowLedgeList  (
                toDayKnowLedge varchar(255) NOT NULL COMMENT '今日知识',
                PRIMARY KEY (toDayKnowLedge)
            )`,
          (err, result) => {
            if (err) console.log("创建表失败KnowLedgeList", err);
            else {
              init(
                "SELECT COUNT(*) FROM KnowLedgeList;",
                "LOAD DATA LOCAL INFILE 'C:/Users/yangp/Desktop/01-xiaoms/nodejs/xmsJs/test.txt' INTO TABLE KnowLedgeList;"
              );
            }
          }
        );
      }
    }
  );
  //创建表foodList
  connection.query(
    `
    SELECT COUNT(1) FROM information_schema.tables WHERE table_schema = 'test' and table_name = 'foodList'`,
    (err, result) => {
      result = JSON.parse(JSON.stringify(result))[0];
      console.log("count", result["COUNT(1)"]);
      if (result["COUNT(1)"]) {
        console.log("已创建表foodList");
        init(
          "SELECT COUNT(*) FROM foodList;",
          "LOAD DATA LOCAL INFILE 'C:/Users/yangp/Desktop/01-xiaoms/nodejs/xmsJs/test3.txt' INTO TABLE foodList;"
        );
      } else {
        connection.query(
          `CREATE TABLE test.foodList  (
                cid int NOT NULL COMMENT '今日知识',title varchar(255) NOT NULL,pic varchar(255) NOT NULL,fid int NOT NULL,etypeName varchar(255) NOT NULL,
                PRIMARY KEY (cid)
            )`,
          (err, result) => {
            if (err) console.log("创建表失败foodList", err);
            else {
              init(
                "SELECT COUNT(*) FROM foodList;",
                "LOAD DATA LOCAL INFILE 'C:/Users/yangp/Desktop/01-xiaoms/nodejs/xmsJs/test3.txt' INTO TABLE foodList;"
              );
            }
          }
        );
      }
    }
  );
  //创建表foodEtypeList
  connection.query(
    `
    SELECT COUNT(1) FROM information_schema.tables WHERE table_schema = 'test' and table_name = 'foodEtypeList'`,
    (err, result) => {
      result = JSON.parse(JSON.stringify(result))[0];
      console.log("count", result["COUNT(1)"]);
      if (result["COUNT(1)"]) {
        console.log("已创建表foodEtypeList");
        init(
          "SELECT COUNT(*) FROM foodEtypeList;",
          "LOAD DATA LOCAL INFILE 'C:/Users/yangp/Desktop/01-xiaoms/nodejs/xmsJs/test2.txt' INTO TABLE foodEtypeList;"
        );
      } else {
        connection.query(
          `CREATE TABLE test.foodEtypeList  (
                cid int NOT NULL COMMENT '今日知识',title varchar(255) NOT NULL,etype int NOT NULL,
                PRIMARY KEY (cid)
            )`,
          (err, result) => {
            if (err) console.log("创建表失败foodEtypeList", err);
            else {
              init(
                "SELECT COUNT(*) FROM foodEtypeList;",
                "LOAD DATA LOCAL INFILE 'C:/Users/yangp/Desktop/01-xiaoms/nodejs/xmsJs/test2.txt' INTO TABLE foodEtypeList;"
              );
            }
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

// //插入
// function insertToDayKnowLedge(data) {
//   connection.query(
//     `
//     INSERT INTO  KnowLedgeList(toDayKnowLedge) VALUES(?)`,
//     [data],
//     (err, result) => {
//       if (err) {
//         console.log("插入失败", err);
//       } else {
//         console.log("插入成功", result);
//       }
//     }
//   );
// }
// function toDayKnowLedge() {}
// module.exports = {
//   connectFirst,
// };
//初始化表
function init(sql1, sql2, callback = () => {}) {
  //导入数据
  let ls;
  connection.query(sql1, (err, data) => {
    if (err) {
      console.log("初始化查询失败", err);
    } else {
      console.log("初始化查询成功", data);
      ls = data[0]["COUNT(*)"];
      if (ls == 0) {
        connection.query(sql2, (err, data) => {
          if (err) {
            console.log("导入失败", err);
          } else {
            console.log("导入成功", data);
          }
        });
      }
    }
  });
}

//查询ToDayKnowLedge
function queryToDayKnowLedge(callback) {
  try {
    connection.query("select * from KnowLedgeList order by rand() limit 1;", (err, data) => {
      if (err) {
        console.log("查询KnowLedgeList失败", err);
      } else {
        console.log("查询KnowLedgeList成功");
        callback(data[0]);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
//查询foodEtypeList
function queryFoodEtypeList(callback) {
  try {
    connection.query("select * from foodEtypeList order By cid;", (err, data) => {
      if (err) {
        console.log("查询foodEtypeList失败", err);
      } else {
        console.log("查询foodEtypeList成功", data);
        callback({ leftCate: data });
      }
    });
  } catch (err) {
    console.log(err);
  }
}
//查询foodList1
function queryFoodList1(dataAll, callback) {
  try {
    connection.query(
      `select * from foodList where etypeName='${lsList[parseInt(dataAll.data.cid) - 1] + "\r"}';`,
      (err, data) => {
        if (err) {
          console.log("查询foodList1失败", err);
        } else {
          console.log("查询foodList1成功");
          let { leftCate } = dataAll;
          console.log(1, dataAll, data, lsList[parseInt(dataAll.data.cid) - 1]);
          for (let i = 0; i < leftCate.length; i++) {
            leftCate[i].child = [];

            for (let j = 0; j < data.length; j++) {
              if (leftCate[i].cid === data[j].fid) {
                leftCate[i].child.push(data[j]);
              }
            }
            if (parseInt(leftCate[i].child.length) === 0) {
              leftCate.splice(i, 1);
              i -= 1;
              continue;
            }
          }
          console.log(2, dataAll, leftCate);
          callback({ rightCate: leftCate });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}
//查询foodList2
function queryFoodList2(dataAll, callback) {
  try {
    connection.query(`select * from foodList where fid=${dataAll.data.cid};`, (err, data) => {
      if (err) {
        console.log("查询foodList2失败", err);
      } else {
        console.log("查询foodList2成功");
        let { leftCate } = dataAll;
        for (let i = 0; i < leftCate.length; i++) {
          leftCate[i].child = [];
          if (parseInt(leftCate[i].cid) > 3) {
            leftCate.splice(i, 1);
            i -= 1;
            continue;
          }
          for (let j = 0; j < data.length; j++) {
            console.log(lsList[parseInt(leftCate[i].cid) - 1], parseInt(data[j].fid));
            if (lsList[parseInt(leftCate[i].cid) - 1] + "\r" === data[j].etypeName) {
              leftCate[i].child.push(data[j]);
            }
          }
          if (parseInt(leftCate[i].child.length) === 0) {
            leftCate.splice(i, 1);
            i -= 1;
            continue;
          }
        }
        callback({ rightCate: leftCate });
      }
    });
  } catch (err) {
    console.log(err);
  }
}
//查询searchFood
function searchFood(dataAll, callback) {
  try {
    connection.query(`select * from foodList where title like '%${dataAll.keyword}%';`, (err, data) => {
      if (err) {
        console.log("查询searchFood失败", err);
      } else {
        console.log("查询searchFood成功", data);
        callback({ list: data });
      }
    });
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  connectFirst,
  queryToDayKnowLedge,
  queryFoodEtypeList,
  queryFoodList1,
  queryFoodList2,
  searchFood,
};
