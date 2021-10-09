import { baseUrl } from "@/api/common";

export default {
  /** 获取博主信息 */
  fetchUserInfo: baseUrl + "/blog/index/getUserInfoById/4",
  /** 获取文章列表 */
  fetchArtistList: baseUrl + "/blog/index/getArticleList",
};
