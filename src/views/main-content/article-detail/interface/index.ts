export interface IArticleDetail {
  id: number /** 文章id */;
  authorName: string /** 作者名 */;
  introduce: string /** 文章简介 */;
  introduceImg: string /** 文章配图 */;
  content: string /** 文章内容 */;
  publishTime: number /** 发布时间 */;
  reprinted: 0 | 1 /** 是否转载: 0：原创， 1: 转载 */;
  title: string /** 文章标题 */;
  type: string /** 文章标签 */;
  viewCount: number /** 点击量 */;
}

export interface IArticleDetailState {
  content?: IArticleDetail;
}
