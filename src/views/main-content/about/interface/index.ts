import { IArticle } from "../../home/interface";

export interface ILatestArticleListResponse {
  list: IArticle[];
}

export interface ILatestArticleListState {
  limit: number /** 查看最近文章的条数 */;
  list: IArticle[];
}
