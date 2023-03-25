import axios from "axios";
// import { Toast } from "vant";
const instance = axios.create({
  //一般就是  项目的域名
  // baseURL: "https://api.tf2sc.cn",
  baseURL: "/local",
  // baseURL: "https://mall.api.epet.com",
  //0表示无超时时间   如果请求在时间内还没有完成将被中断
  timeout: 5000,
});
instance.interceptors.request.use(
  function (config) {
    // console.log("config:", config);
    // Toast.loading({
    //   message: "加载中...",
    //   forbidClick: false,
    //   overlay: true,
    // });
    console.log(config);

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// ************** 对响应数据做点什么  代码里还没能得到数据
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // Toast.clear();
    // 对响应数据做点什么
    //因为    axios对服务器返回的数据做了处理
    //比如     已经把服务器返回的json字符串转为json对象
    //比如   服务器返回的数据外面包了一层
    //因为axios为自动为服务器数据包裹一层
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

//默认导出
export default instance;
