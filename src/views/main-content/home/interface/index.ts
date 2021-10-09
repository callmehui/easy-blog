export interface IArticleState {
  type: string /** 文章类型 */;
  limit: number /** 文章分页参数 */;
  offset: number /** 文章分页参数 */;
  total: number /** 文章总数量 */;
  list: IArticle[] /** 文章列表 */;
  hasMore: boolean /** 是否还有更多文章 */;
}

export interface IFetchArticleListResponse {
  list: IArticle[] /** 文章列表 */;
  total: number /** 文章总数量 */;
}

export interface IArticle {
  id: number /** 文章id */;
  authorName: string /** 作者名 */;
  introduce: string /** 文章简介 */;
  introduceImg: string /** 文章配图 */;
  publishTime: string /** 发布时间 */;
  reprinted: 0 | 1 /** 是否转载: 0：原创， 1: 转载 */;
  title: string /** 文章标题 */;
  type: string /** 文章标签 */;
  viewCount: number /** 点击量 */;
}

export interface IUserInfo {
  articleCount: number /** 文章数 */;
  bgImg: string /** 背景图片 */;
  githubUrl: string /** github */;
  novelCount: number /** 小说数 */;
  portrait: string /** 头像 */;
  qqAccount: string /** qq号 */;
  talkCount: number /** 说说数 */;
  username: string /** 用户名 */;
  weChatAccount: string /** 微信号 */;
}
