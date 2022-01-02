export type CommentTypeName = "articleId" | "talkId" | "novelId" | "aboutId";

export interface ICommentLikeItem {
  id?: number;
  visitorId: number;
}

/** 获取评论列表接口参数 */
export interface IFetchCommentsProps {
  typeName: CommentTypeName /** 评论类型 */;
  parentId: number /** 父级评论id */;
  limit: number /** 每页条数 */;
  offset: number /** 偏移量 */;
}

/** 评论列表单条评论接口定义 */
export interface IFetchCommentItem {
  beCommentId: string /** 被评论的id */;
  comment: string /** 评论内容 */;
  id: number /** 评论id */;
  likeList: ICommentLikeItem[] /** 评论点赞数组 */;
  nickname: string /** 评论人昵称 */;
  portrait: string /** 评论人头像 */;
  publishTime: number /** 评论时间 */;
  site: string /** 评论人个人站点 */;
  visitorId: number /** 评论人的访客id */;
}

/** 单条评论接口定义 */
export interface ICommentItem extends IFetchCommentItem {
  children: ICommentItem[] /** 子评论 */;
}

/** 发表评论参数 */
export interface IAddCommentParams {
  visitorId: number /**  评论人的访客id */;
  typeName: CommentTypeName /** 评论类型 */;
  comment: string /** 评论内容 */;
  publishTime: number /** 评论时间 */;
  parentId: number /** 父级评论id */;
  beCommentId?: number /** 被评论的id */;
  limit: number /** 每页条数 */;
  offset: number /** 偏移量 */;
}

/** 发表评论返回值 */
export interface IAddCommentResponse {
  success: boolean /** 请求是否成功 */;
  message: string /** 请求返回的消息 */;
  data: IFetchCommentItem[] /** 评论列表 */;
}
