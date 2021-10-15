export type CoverImageType =  "png"| "jpg" | "svg";

export interface ICoverDesigner {
  title: string, /** 封面标题 */
  subTitle: string, /** 封面小标题 */
  image1: string, /** 封面配图1 */
  image2: string, /** 封面配图2 */
  template: string, /** 模板类型 */
  name: string, /** 封面图片名称 */
  imageType: CoverImageType, /** 图片类型 */
}

/** 上传图片成功返回值 */
export interface IImageUploadResponse {
  success: boolean;
  data: {
    url: string; /** 上传后的图片地址，需拼接域名 */
  }
}