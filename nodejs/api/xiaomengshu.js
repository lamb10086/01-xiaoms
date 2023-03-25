const express = require("express");
const cors = require("cors");
const app = express();
const sqlName = require("./sqlName");
const sqlDb = require("../sql/xmsSql");
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.all("*", function (req, res, next) {
//   //后端设置跨域请求头  *代表所有 不安全 谁都可以访问公司后台
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   //实际开发中 配置白名单   只有在白名单内的域名才能进行跨域访问
//   // res.setHeader("Access-Control-Allow-Origin",["http://127.0.0.1:5500"]);

//   //...Headers必须的固定值,"content-type"
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   // res.setHeader("Access-Control-Allow-Headers","X-request-With");

//   //允许跨域的  请求方式
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");

//   //放行
//   next();
// });
app.get("/toDayKnowLedge", (req, res) => {
  console.log("接收到");
  if (req.query.pet_type == "dog" || req.query.pet_type == "cat") {
    sqlDb[sqlName.QUERY_TODAYKNOWLEDGE]((data) => {
      res.json({
        data: {
          ...data,
        },
      });
    });
  }
  return;
});
//接收foodEtypeList查询
app.post("/foodEtypeList", (req, res) => {
  if (req.body.pet_type == "dog" || req.body.pet_type == "cat") {
    sqlDb[sqlName.QUERY_FOODETYPELIST]((data) => {
      res.json({
        data: {
          ...data,
        },
      });
    });
  }
  return;
});
//接收foodList查询
app.post("/foodList", (req, res) => {
  if (req.body.data.pet_type == "dog" || req.body.data.pet_type == "cat") {
    if (req.body.data.etype === 1) {
      sqlDb[sqlName.QUERY_FOODLIST1](req.body, (data) => {
        res.json({
          data: {
            ...data,
          },
        });
      });
    } else {
      sqlDb[sqlName.QUERY_FOODLIST2](req.body, (data) => {
        res.json({
          data: {
            ...data,
          },
        });
      });
    }
  }
  return;
});
//接收searchFood查询
app.post("/searchFood", (req, res) => {
  console.log(req.body);
  if (req.body.do == "Suggest") {
    if (req.body.keyword != "") {
      sqlDb[sqlName.SEARCH_FOOD](req.body, (data) => {
        res.json({
          data: {
            ...data,
          },
        });
      });
    }
  }
  return;
});
app.listen(8081, () => {
  console.log("服务器8081启动");
  sqlDb[sqlName.CONNECTFIRST]();
});
