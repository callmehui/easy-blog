import { baseUrl } from "@/api/common";

export default {
  /** 评论者注册（创建评论者的个人信息） */
  visitorLogin: baseUrl + "/blog/comment/visitorLogin",
  /** 获取评论列表 */
  fetchComments: baseUrl + "/blog/comment/getComments",
  /** 发表评论 */
  addComment: baseUrl + "/blog/comment/addComment",
  /** 评论点赞 */
  addCommentsLikeNum: baseUrl + "/blog/comment/addLikeCount",
  /** 更新用户头像 */
  updatePortrait: baseUrl + "/blog/comment/updatePortrait",
};
