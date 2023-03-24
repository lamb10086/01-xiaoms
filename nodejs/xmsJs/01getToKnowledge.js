const fs = require("fs");

const express = require("express");
let app = express();
app.use(express.static("./public"));
const { createProxyMiddleware } = require("http-proxy-middleware");

//参数1：代理路径  自己定义的
//参数2：代理配置
app.use(
  "/appp",
  createProxyMiddleware({
    target: "https://mall.api.epet.com", //代理目标 代理谁  代理哪个服务器 代理哪个路径
    changeOrigin: true, //是否支持跨域
    pathRewrite: {
      //path Rewrite 路径重写
      "^/appp": "", //^复制参数1
    },
  })
);
app.use(express.json());
let ls = 0;
alldata = "";
app.use(express.urlencoded({ extended: true }));
app.post("/add", (req, res) => {
  //   console.log(req.body);
  alldata += req.body.need + "\n";
  ls++;
  res.json({});
  console.log(ls);
  if (ls == 100) finish();
});
function finish() {
  fs.writeFile(
    "test.txt",
    alldata,
    {
      encoding: "utf-8",
      flag: "w",
    },
    function (err) {
      if (err) {
        console.log("写入失败", err);
      } else {
        console.log("写入成功");
      }
    }
  );
}
app.listen(9090, () => {
  console.log("9090服务已经启动");
});
