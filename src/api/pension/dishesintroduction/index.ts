import { request } from '/@/utils/http/axios';
// PensionDishesintroduction

// 保存
// POST
// /pension/dishesintroduction
export function createPensionDishesintroduction(data: any) {
  return request.post({
    url: `/pension/dishesintroduction`,
    data
  })
}

// 修改
// PUT
// /pension/dishesintroduction/{id}
export function updatePensionDishesintroduction(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/dishesintroduction/${id}`,
    data
  })
}

// 分页
// GET
// /pension/dishesintroduction/list
export function getPensionDishesintroductionPage(params: any) {
  return request.get({
    url: `/pension/dishesintroduction/list`,
    params
  })
}

// 获取未绑定服务区域列表
// GET
// /pension/dishesintroduction/serverAreas
export function getPensionDishesintroductionServerAreas(params: any) {
  return request.get({
    url: `/pension/dishesintroduction/serverAreas`,
    params
  })
}

// 信息
// GET
// /pension/dishesintroduction/{id}
export function getPensionDishesintroductionById({ id }: any) {
  return request.get({
    url: `/pension/dishesintroduction/${id}`,
  })
}

// 删除
// DELETE
// /pension/dishesintroduction/{id}
export function deletePensionDishesintroductionById({ id }: any) {
  return request.delete({
    url: `/pension/dishesintroduction/${id}`,
  })
}

// 菜单富文本编辑
// PUT
// /pension/dishesintroduction/{id}/details
export function detailsPensionDishesintroduction(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/dishesintroduction/${id}/details`,
    data
  })
}

// 套餐富文本编辑
// PUT
// /pension/dishesintroduction/{id}/mealdetails
export function mealdetailsPensionDishesintroduction(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/dishesintroduction/${id}/mealdetails`,
    data
  })
}

// 套餐富文本编辑
// PUT
// /pension/dishesintroduction/{id}/orderlink
export function orderlinkPensionDishesintroduction(data: any) {
  const { id } = data
  return request.put({
    url: `/pension/dishesintroduction/${id}/orderlink`,
    data
  })
}
