const express = require("express");
const cors = require("cors");
const app = express();
const sqlName = require("./sqlName");
const sqlDb = require("../sql/xmsSql");
app.use(cors());
app.use(express.json());
app.all("*", function (req, res, next) {
  console.log("此路是我开");
  //后端设置跨域请求头  *代表所有 不安全 谁都可以访问公司后台
  res.setHeader("Access-Control-Allow-Origin", "*");
  //实际开发中 配置白名单   只有在白名单内的域名才能进行跨域访问
  // res.setHeader("Access-Control-Allow-Origin",["http://127.0.0.1:5500"]);

  //...Headers必须的固定值,"content-type"
  res.setHeader("Access-Control-Allow-Headers", "*");
  // res.setHeader("Access-Control-Allow-Headers","X-request-With");

  //允许跨域的  请求方式
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");

  //放行
  next();
});
app.get("/toDayKnowLedge", async (req, res) => {
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
app.listen(8081, () => {
  console.log("服务器8081启动");
  sqlDb[sqlName.CONNECTFIRST]();
});
