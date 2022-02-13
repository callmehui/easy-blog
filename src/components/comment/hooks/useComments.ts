import { useMutation, useQuery, useQueryClient } from "vue-query";
import { apis } from "@/api";
import { http } from "@/common/js/http";
import { CommentType } from "../interface";
import {
  CommentTypeName,
  IAddCommentParams,
  IAddCommentResponse,
  ICommentItem,
  IFetchCommentItem,
  IFetchCommentsProps,
} from "./interface";
import { reactive, Ref } from "vue";

/** 获取评论列表 */
export const fetchComments = (
  id: number,
  type: CommentType = "article",
  page = 1,
  limit = 100
) => {
  let typeName: CommentTypeName = "articleId";
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
      typeName = "articleId";
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
          item.children = secondComment;
        });
        return comments;
      },
    }
  );
};

/**
 *
 * @param commentId 评论id
 * @param visitorId 访客id
 * @param isAdd true: 点赞评论， false: 取消点赞评论
 */
export const toogleCommentLike = (
  commentId: number,
  visitorId: number,
  isAdd: boolean
) => {
  return http(
    {
      method: "post",
      url: apis.addCommentsLikeNum,
      data: {
        commentId,
        visitorId,
        isAdd,
      },
    },
    "success"
  );
};

/**
 * 更新访客头像
 * @param id 访客id
 * @param portrait 访客头像url
 * @returns
 */
export const updatePortrait = (id: number, portrait: string) => {
  return http({
    method: "post",
    url: apis.updatePortrait,
    data: {
      id,
      portrait,
    },
  });
};

/**
 * 发表评论参数
 * @param params 评论参数
 * @returns
 */
export const addComment = (params: IAddCommentParams) => {
  return http<IAddCommentResponse>(
    {
      method: "post",
      url: apis.addComment,
      data: params,
    },
    "data"
  );
};
