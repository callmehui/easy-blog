import router from "@/router";

/** 跳转到首页 */
export const gotoHomePage = () => {
  router.push(`/home`);
};

/** 跳转到作品页面 */
export const gotoProductionPage = () => {
  router.push(`/product`);
};

/** 跳转到关于我页面 */
export const gotoAboutPage = () => {
  router.push(`/about`);
};

/** 跳转到简历页面 */
export const gotoResumePage = () => {
  router.push(`/resume`);
};

/** 跳转到文章详情页面 */
export const gotoArticleDetailPage = (id: string | number) => {
  router.push(`/article-detail/${id}`);
};
