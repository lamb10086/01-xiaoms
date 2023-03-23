import axios from "axios";
// import { Toast } from "vant";
const instance = axios.create({
  //一般就是  项目的域名
  // baseURL: "https://api.tf2sc.cn",
  baseURL: "/local",
  // baseURL: "https://mall.api.epet.com",
  //0表示无超时时间   如果请求在时间内还没有完成将被中断
  timeout: 5000,
  headers: { "content-type": "application/x-www-form-urlencoded" },
});

// **************在发送请求之前做些什么  还没有向服务器发起请求
//默认导出
export default instance;
