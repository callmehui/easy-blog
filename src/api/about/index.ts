import { baseUrl } from "@/api/common";

export default {
  /** 获取最新n篇文章 */
  fetchLatestArticle: baseUrl + "/blog/articlelist/getLatestArticle",
};
