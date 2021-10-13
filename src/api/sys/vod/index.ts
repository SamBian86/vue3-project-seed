import { request } from '/@/utils/http/axios';

// 列表
// GET
// /sys/vod/all
export function getSysVodList(params: any) {
  return request.get({
    url: `/sys/vod/all`,
    params
  })
}

// 分页
// GET
// /sys/vod/list
export function getSysVodPage(params: any) {
  return request.get({
    url: `/sys/vod/list`,
    params
  })
}

// 获取视频播放凭证
// GET
// /sys/vod/play/auth
export function getSysVodPlayAuth(params: any) {
  return request.get({
    url: `/sys/vod/play/auth`,
    params
  })
}

// 获取视频播放地址
// GET
// /sys/vod/play/info
export function getSysVodPlayInfo(params: any) {
  return request.get({
    url: `/sys/vod/play/info`,
    params
  })
}

// 更新视频引用状态
// PUT
// /sys/vod/update/status/{id}
export function updateSysVodStatus(data: any) {
  const { id } = data
  return request.put({
    url: `/sys/vod/update/status/${id}`,
    data
  })
}

// 获取辅助媒资上传凭证
// GET
// /sys/vod/upload/attachedMedia/voucher
export function getSysVodUploadAttachedMediaVoucher(params: any) {
  return request.get({
    url: `/sys/vod/upload/attachedMedia/voucher`,
    params
  })
}

// 获取图片上传凭证
// GET
// /sys/vod/upload/img/voucher
export function getSysVodUploadImgVoucher(params: any) {
  return request.get({
    url: `/sys/vod/upload/img/voucher`,
    params
  })
}

// 文件流视频上传
// POST
// /sys/vod/upload/video/stream
export function uploadSysVodVideoStream(data: any) {
  return request.uploadFile({
    url: `/sys/vod/upload/video/stream`,
    data
  })
}

// 网络流视频上传
// POST
// /sys/vod/upload/video/urlStream
export function uploadSysVodVideoUrlStream(data: any) {
  return request.uploadFile({
    url: `/sys/vod/upload/video/urlStream`,
    data
  })
}

// 获取视频上传凭证和地址
// GET
// /sys/vod/upload/video/voucher
export function getSysVodUploadVideoVoucher(params: any) {
  return request.get({
    url: `/sys/vod/upload/video/voucher`,
    params
  })
}

// 刷新视频上传凭证
// GET
// /sys/vod/upload/video/{videoId}
export function getSysVodUploadVideoById(params: any) {
  const { videoId } = params
  return request.get({
    url: `/sys/vod/upload/video/${videoId}`,
    params
  })
}

// 删除视频素材
// DELETE
// /sys/vod/video/delete/{id}
export function deleteSysVodVideoById({ id }: any) {
  return request.delete({
    url: `/sys/vod/video/delete/${id}`,
  })
}

// 保存视频信息
// POST
// /sys/vod/video/insert
export function createSysVod(data: any) {
  return request.post({
    url: `/sys/vod/video/insert`,
    data
  })
}

// 更新视频视频信息(重新上传文件需刷新上传凭证和地址)
// PUT
// /sys/vod/video/update
export function updateSysVod(data: any) {
  return request.put({
    url: `/sys/vod/video/update`,
    data
  })
}

// 信息
// GET
// /sys/vod/video/{id}
export function getSysVodById({ id }: any) {
  return request.get({
    url: `/sys/vod/video/${id}`,
  })
}
