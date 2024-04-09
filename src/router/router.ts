import { RouteRecordRaw } from "vue-router";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import ViewQuestionsView from "@/views/question/ViewQuestionsView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import PersonalCenterView from "@/views/user/PersonalCenterView.vue";
// import SearchView from "@/views/search/SearchPageView.vue";
import PostView from "@/views/post/PostView.vue";
import PersonalHomePageView from "@/views/user/PersonalHomePageView.vue";
import LearningView from "@/views/study/LearningView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/questions", // 添加重定向规则，将根路径重定向到/questions
  },
  {
    path: "/study",
    name: "学习",
    component: LearningView,
  },
  {
    path: "/questions",
    name: "题库",
    component: QuestionsView,
  },
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  //   path: "/personal/center",
  //   name: "用户中心",
  //   component: PersonalCenterView,
  //   meta: {
  //     access: ACCESS_ENUM.USER,
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/personal/homepage",
  //   name: "个人主页",
  //   component: PersonalHomePageView,
  //   meta: {
  //     access: ACCESS_ENUM.USER,
  //     hideInMenu: true,
  //   },
  // },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  // {
  {
    path: "/questions/:category",
    component: QuestionsView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/question_submit",
    name: "提交记录",
    component: QuestionSubmitView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/contest",
    name: "竞赛",
    component: PostView,
  },
  {
    path: "/post",
    name: "讨论",
    component: PostView,
  },
  {
    path: "/company",
    name: "求职",
    component: PostView,
  },
  {
    path: "/view/question/:id/:category?/:questionSubmitId?",
    name: "在线做题",
    component: ViewQuestionsView,
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  // {
  //   path: "/search",
  //   name: "聚合搜索",
  //   component: SearchView,
  //   props: true,
  //   meta: {
  //     access: ACCESS_ENUM.USER,
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/search/:category",
  //   component: SearchView,
  //   props: true,
  //   meta: {
  //     access: ACCESS_ENUM.USER,
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/hide",
  //   name: "隐藏页面",
  //   component: HomeView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/noAuth",
  //   name: "无权限",
  //   component: NoAuthView,
  // },
  // {
  //   path: "/admin",
  //   name: "仅管理员可见",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/about",
  //   name: "关于我的",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];
