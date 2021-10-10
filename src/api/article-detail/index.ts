import { baseUrl } from "@/api/common";

export default {
  /** 获取文章内容 */
  fetchArticleDetail: baseUrl + "/blog/articledetail/getArticleDetailById",
  /** 更新文章的访问量 */
  addArticleViewCountById:
    baseUrl + "/blog/articledetail/addArticleViewCountById",
};
