import { IVisitorState } from "./visitor";

export interface IRootStateTypes {
  visitor: IVisitorState;
}
export interface IAllStateTypes extends IRootStateTypes {
  ModuleVisitor: IVisitorState;
}
