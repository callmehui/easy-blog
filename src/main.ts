import { createApp } from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "highlight.js/styles/monokai-sublime.css";
import "@/common/css/tailwind.css";

const app = createApp(App);

const modules = import.meta.glob("./components/**/MP[A-Z]w+.vue");
Object.keys(modules).forEach((fileName: string) => {
  // 获取组件配置
  const componentConfig = modules[fileName];

  // 获取组件的 PascalCase 名
  const componentName = upperFirst(
    camelCase(
      // 获取目录深度无关的文件名
      (fileName.split("/").pop() as string).replace(/\.\w+$/, "")
    )
  );

  app.component(
    componentName,
    // 否则回退到模块的根。
    componentConfig
  );
});

app.use(store).use(router).use(ElementPlus).mount("#app");
