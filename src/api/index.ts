import AppApis from "./app";
import HomeApis from "./home";
import AboutApis from "./about";
import ArticleDetailApis from "./article-detail";
import CommentApis from "./comment";

const apis = {
  ...AppApis,
  ...HomeApis,
  ...AboutApis,
  ...ArticleDetailApis,
  ...CommentApis,
};

export { apis };
