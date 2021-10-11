import AppApis from "./app";
import HomeApis from "./home";
import AboutApis from "./about";
import ArticleDetailApis from "./article-detail";

const apis = {
  ...AppApis,
  ...HomeApis,
  ...AboutApis,
  ...ArticleDetailApis,
};

export { apis };
