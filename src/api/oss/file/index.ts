import { request } from '/@/utils/http/axios';

// 保存
// POST
// /oss/file
export function createOssFile(data: any) {
  return request.post({
    url: `/oss/file`,
    data
  })
}

// 分页
// GET
// /oss/file/page
export function getOssFilePage(params: any) {
  return request.get({
    url: `/oss/file/page`,
    params
  })
}

// 云存储配置信息
// GET
// /oss/file/info
export function getOssFileInfo() {
  return request.get({
    url: `/oss/file/info`,
  })
}

// 删除
// DELETE
// /oss/file
export function deleteOssFile(data: any) {
  return request.delete({
    url: `/oss/file`,
    data
  })
}

// 上传
// GET
// /oss/file/upload
export function uploadOssFile(data: any) {
  return request.uploadFile({
    url: `/oss/file/upload`,
    data
  })
}
