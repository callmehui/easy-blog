import HomeApis from "./home";
import ArticleDetailApis from "./article-detail";

const apis = {
  ...HomeApis,
  ...ArticleDetailApis,
};

export { apis };
