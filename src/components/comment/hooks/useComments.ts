import { useQuery } from "vue-query";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { CommentType } from "../interface";
import {
  CommentTypeName,
  ICommentItem,
  IFetchCommentItem,
  IFetchCommentsProps,
} from "./interface";
import { reactive, Ref } from "vue";

/** 获取评论列表 */
export const fetchComments = (
  id: number,
  type: CommentType = "talk",
  page = 1,
  limit = 100
) => {
  let typeName: CommentTypeName = "talkId";
  switch (type) {
    case "talk":
      typeName = "talkId";
      break;
    case "article":
      typeName = "articleId";
      break;
    case "novel":
      typeName = "novelId";
      break;
    case "about":
      typeName = "aboutId";
      break;
    default:
      typeName = "talkId";
      break;
  }
  const dataProps: IFetchCommentsProps = {
    typeName,
    parentId: id,
    limit: limit,
    offset: (page - 1) * limit,
  };
  return http<IFetchCommentItem[]>(
    {
      method: "post",
      url: apis.fetchComments,
      data: dataProps,
    },
    "data"
  );
};

/** 获取评论列表 */
export const useComments = (
  id: Ref<number>,
  type: Ref<CommentType>,
  page = 1,
  limit = 100
) => {
  return useQuery(
    reactive(["fetchComment", { id, type }]),
    () => fetchComments(id.value, type.value, page, limit),
    {
      select: (data: IFetchCommentItem[]) => {
        const comments: ICommentItem[] = [];
        const secondComment: ICommentItem[] = [];
        data.forEach((item, index) => {
          if (item.beCommentId) {
            secondComment.push({ ...item, children: [] });
          } else {
            comments.push({ ...item, children: [] });
          }
        });
        comments.forEach((item) => {
          item.children = [];
          secondComment.forEach((subItem) => {
            if (item.id === Number(subItem.beCommentId)) {
              item.children.push(subItem);
            }
          });
        });
        return comments;
      },
    }
  );
};
