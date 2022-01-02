export interface IVisitor {
  id?: number /** 访客id */;
  nickname?: string /** 访客昵称 */;
  portrait?: string /** 访客头像 */;
}

export interface IVisitorState {
  visitor: IVisitor;
}
