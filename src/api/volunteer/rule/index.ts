import { request } from '/@/utils/http/axios';
// VolunteerRule

// 保存
// POST
// /volunteer/rule
export function createVolunteerRule(data: any) {
  return request.post({
    url: `/volunteer/rule`,
    data
  })
}

// 修改
// PUT
// /volunteer/rule/{id}
export function updateVolunteerRule(data: any) {
  const { id } = data
  return request.put({
    url: `/volunteer/rule/${id}`,
    data
  })
}

// 分页
// GET
// /volunteer/rule/list
export function getVolunteerRulePage(params: any) {
  return request.get({
    url: `/volunteer/rule/list`,
    params
  })
}

// 信息
// GET
// /volunteer/rule/{id}
export function getVolunteerRuleById({ id }: any) {
  return request.get({
    url: `/volunteer/rule/${id}`,
  })
}

// 删除
// DELETE
// /volunteer/rule/{id}
export function deleteVolunteerRuleById({ id }: any) {
  return request.delete({
    url: `/volunteer/rule/${id}`,
  })
}
