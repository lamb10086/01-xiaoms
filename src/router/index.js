import { createRouter, createWebHashHistory } from "vue-router";
import XiaomengShu from "../views/XiaomengShu.vue";
import eatView from "../views/xiaomengshu/ToolView/Eat/EatView.vue";
import eatlist from "../views/xiaomengshu/ToolView/Eat/MainCom.vue";

const routes = [
  {
    path: "/",
    name: "xiaoms",
    component: XiaomengShu,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/choiceness",
    name: "choiceness",
    component: () => import("@/views/ChoicenessView.vue"),
  },
  {
    path: "/classify",
    name: "classify",
    component: () => import("@/views/ClassifyView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/CartView.vue"),
  },
  {
    path: "/myselfe",
    name: "myselfe",
    component: () => import("@/views/MyselfEView.vue"),
  },
  {
    path: "/able",
    name: "able",
    component: () => import("../views/xiaomengshu/ToolView/Able/AbleView.vue"),
    children: [
      {
        path: "main",
        name: "main",
        component: () => import("../views/xiaomengshu/ToolView/Able/ableHome.vue"),
      },
      {
        path: "listPage1",
        name: "listPage1",
        component: () => import("@/views/xiaomengshu/ToolView/Able/ListPage1.vue"),
      },
      {
        path: "listPage2",
        name: "listPage2",
        component: () => import("@/views/xiaomengshu/ToolView/Able/ListPage2.vue"),
      },
      {
        path: "ablesearch",
        name: "ablesearch",
        component: () => import("@/views/xiaomengshu/ToolView/Able/SearchPage.vue"),
      },
      {
        path: "pageIntroduce",
        name: "pageIntroduce",
        component: () => import("@/views/xiaomengshu/ToolView/Able/PageIntroduce.vue"),
      },
    ],
    redirect: {
      name: "main",
    },
  },
  {
    path: "/eat",
    name: "eat",
    component: eatView,

    children: [
      {
        path: "list",
        name: "list",
        component: eatlist,
      },
      {
        path: "page",
        name: "page",
        component: () => import("@/views/xiaomengshu/ToolView/Eat/PageCom.vue"),
      },
    ],
    redirect: {
      name: "list",
    },
  },
  {
    path: "/illness",
    name: "illness",
    component: () => import("@/views/xiaomengshu/ToolView/Illness/IllnessView.vue"),
    children: [
      {
        path: "illnessmain",
        name: "illnessmain",
        component: () => import("../views/xiaomengshu/ToolView/Illness/IllnessMain.vue"),
      },
      {
        path: "illnessfrom",
        name: "illnessfrom",
        component: () => import("../views/xiaomengshu/ToolView/Illness/IllnessForm.vue"),
      },
      {
        path: "illnesspage",
        name: "illnesspage",
        component: () => import("../views/xiaomengshu/ToolView/Illness/IllnessPage.vue"),
      },
    ],
    redirect: {
      name: "illnessmain",
    },
  },
  {
    path: "/wormermain",
    name: "wormermain",
    component: () => import("../views/xiaomengshu/ToolView/Wormer/WormerMain.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
