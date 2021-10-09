import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

/**
 * 实现路由懒加载的工具函数
 * @param {string} viewPath  view的相对路径，相对于src目录
 */
function lazyLoad(viewPath: string) {
  const modules = import.meta.glob("../views/**/*.vue");
  return modules[`../views/main-content/${viewPath}/index.vue`];
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: lazyLoad("home"),
  },
  {
    // 作品集
    path: "/production",
    name: "Production",
    component: lazyLoad("production"),
  },
  {
    // 关于我
    path: "/about",
    name: "About",
    component: lazyLoad("about"),
  },
  {
    // 简历
    path: "/resume",
    name: "Resume",
    component: lazyLoad("resume"),
  },
];

const router = createRouter({
  // 本地使用hash模式，使用history模式刷新会404
  history:
    import.meta.env.MODE === "production"
      ? createWebHistory(import.meta.env.BASE_URL)
      : createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
