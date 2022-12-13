import { createApp } from "vue";
import App from "./App.vue";
import { VueMasonryPlugin } from "vue-masonry";
import "vant/lib/index.css";
import router from "./router";
import "../public/Iconfont/iconfont.css";
import store from "./store";
import {
  Button,
  Popup,
  NavBar,
  List,
  Grid,
  Toast,
  GridItem,
  Checkbox,
  CheckboxGroup,
  Swipe,
  SwipeItem,
  Search,
  Icon,
  Tab,
  Form,
  Field,
  Tabs,
  Cell,
  CellGroup,
  Lazyload,
  ConfigProvider,
  Col,
  RadioGroup,
  Radio,
  DatePicker,
  Tabbar,
  Sidebar,
  SidebarItem,
  TabbarItem,
  Image as VanImage,
  Divider,
  Row,
} from "vant";

let app = createApp(App);
app.use(router);
app.use(Tabbar);
app.use(Swipe);
app.use(SwipeItem);
app.use(TabbarItem);
app.use(Popup);
app.use(Tab);
app.use(DatePicker);
app.use(Tabs);
app.use(Sidebar);
app.use(Radio);
app.use(RadioGroup);
app.use(SidebarItem);
app.use(Form);
app.use(Field);
app.use(Search);
app.use(store);
app.use(Checkbox);
app.use(CheckboxGroup);
app.use(Lazyload, {
  lazyComponent: true,
  loading: require("../public/pictrue/loading.png"),
});
app.use(Toast);
app.use(Lazyload);
app.use(Divider);
app.use(ConfigProvider);
app.use(Cell);
app.use(Col);
app.use(VanImage);
app.use(Row);
app.use(CellGroup);
app.use(Icon);
app.use(VueMasonryPlugin);
app.use(Grid);
app.use(GridItem);
app.use(NavBar);
app.use(List);
app.use(Button);
app.mount("#app");
