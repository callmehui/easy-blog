export type CommentTypeName = "articleId" | "talkId" | "novelId" | "aboutId";

/** 获取评论列表接口参数 */
export interface IFetchCommentsProps {
  typeName: CommentTypeName /** 评论名 */;
  parentId: number /** 评论id */;
  limit: number /** 每页条数 */;
  offset: number /** 偏移量 */;
}

/** 评论列表单条评论接口定义 */
export interface IFetchCommentItem {
  beCommentId: string /** 被评论的id */;
  comment: string /** 评论内容 */;
  id: number /** 评论id */;
  likeNum: number /** 评论点赞数 */;
  nickname: string /** 评论人昵称 */;
  portrait: string /** 评论人头像 */;
  publishTime: number /** 评论时间 */;
  site: string /** 评论人个人站点 */;
  visitorId: number /** 评论人的访客id */;
}

/** 单条评论接口定义 */
export interface ICommentItem extends IFetchCommentItem {
  children: IFetchCommentItem[] /** 子评论 */;
}
