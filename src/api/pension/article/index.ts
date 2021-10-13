import { request } from '/@/utils/http/axios';
// PensionArticle

// 保存
// POST
// /pension/article
export function createPensionArticle(data: any) {
  return request.post({
    url: `/pension/article`,
    data
  })
}

// 修改
// PUT
// /pension/article/{articleId}
export function updatePensionArticle(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/article/${id}`,
    data
  })
}

// 分页
// GET
// /pension/article/list
export function getPensionArticlePage(params: any) {
  return request.get({
    url: `/pension/article/list`,
    params
  })
}

// 信息
// GET
// /pension/article/{id}
export function getPensionArticleById({ id }: any) {
  return request.get({
    url: `/pension/article/${id}`,
  })
}

// 删除
// DELETE
// /pension/article/{id}
export function deletePensionArticleById({ id }: any) {
  return request.delete({
    url: `/pension/article/${id}`,
  })
}

// 上/下架
// PUT
// /pension/article/display
export function displayPensionArticle(params: any) {
  // const { id, display } = data
  return request.put({
    url: `/pension/article/display`,
    params
  })
}
