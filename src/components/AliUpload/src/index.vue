<template>
  <div class="component-ali-upload-wrapper">
    <!-- 文件上传按钮 -->
    <div class="component-ali-upload-choose-wrapper" v-if="!uploading && !_videoId">
      <div class="component-ali-upload-choose-button" @click="chooseClickHandle">
        {{ title === '' ? $t('components.aliUpload.titleWarningMessage') : $t('components.aliUpload.choose') }}
      </div>
      <div class="component-ali-upload-input-wrapper" :style="title === '' ? 'z-index: 30' : ''">
        <input ref="fileDom" type="file" @change="fileChangeHandle" />
      </div>
    </div>
    <div v-if="uploading" class="component-ali-upload-progress">
      <el-progress :text-inside="true" :stroke-width="26" :percentage="progressPercentage" :status="progressStatus"></el-progress>
    </div>
    <div v-if="actionView" class="component-ali-upload-action">
      <div @click="playHandle">{{ $t('components.aliUpload.play') }}</div>
      <div @click="deleteHandle" v-if="!disabled">{{ $t('components.aliUpload.delete') }}</div>
    </div>
    <div v-if="playView" class="component-ali-upload-play">
      <video ref="videoDom" :src="videoUrl" type="video/mp4" controls />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, unref } from 'vue'
import { StyleEnum } from '/@/enums/styleEnum'
import props from './props'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import useSysVodRepository from '/@/views/pages/sys/vod/useSysVodRepository' // 模板修改标记
export default defineComponent({
  name: 'AliUpload',
  props: { ...props },
  setup(props, { emit }) {
    const { t } = useI18n()
    const disabled = ref(props.disabled)
    const uploaderObj = ref(null)
    const fileDom = ref(null)
    const fileName = ref('')
    const videoDom = ref(null)
    const title = ref(props.title || '')
    const _videoId = ref(props.videoId || '')
    const uploading = ref(false)
    const actionView = ref(false)
    const playView = ref(false)
    const videoUrl = ref('')
    const progressStatus = ref('')
    const progressPercentage = ref(0)

    const { getSysVodUploadVideoVoucherHandle, getSysVodUploadVideoByIdHandle, getSysVodPlayInfoHandle } = useSysVodRepository()
    if (disabled.value) {
      actionView.value = true
    }

    // 阿里云上传配置
    const AliyunUploadConfig = {
      userId: '1552430523574981',
      region: 'cn-shanghai',
      partSize: 1048576,
      parallel: 5,
      retryCount: 3,
      retryDuration: 2
    }

    function initAliyunUpload() {
      return new window.AliyunUpload.Vod({
        //userID，必填，只需有值即可。
        userId: AliyunUploadConfig.userId,
        //上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: AliyunUploadConfig.region,
        //分片大小默认1 MB，不能小于100 KB
        partSize: AliyunUploadConfig.partSize,
        //并行上传分片个数，默认5
        parallel: AliyunUploadConfig.parallel,
        //网络原因失败时，重新上传次数，默认为3
        retryCount: AliyunUploadConfig.retryCount,
        //网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: AliyunUploadConfig.retryDuration,
        //开始上传
        onUploadstarted: function (uploadInfo: any) {
          // getSysVodUploadVideoVoucherHandle, getSysVodUploadVideoByIdHandle
          const { videoId } = uploadInfo
          if (!videoId) {
            getSysVodUploadVideoVoucherHandle({
              title,
              fileName: uploadInfo.file.name
            }).then((results) => {
              const { uploadAuth, uploadAddress, videoId } = results
              _videoId.value = videoId
              uploaderObj.value.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
            })
          } else {
            getSysVodUploadVideoByIdHandle({ videoId }).then((results) => {
              const { uploadAuth, uploadAddress, videoId } = results
              _videoId.value = videoId
              uploaderObj.value.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
            })
          }

          // console.log('onUploadstarted')
          uploading.value = true
          actionView.value = false
          playView.value = false
          progressStatus.value = ''
          progressPercentage.value = 0
        },
        //文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
          // console.log('onUploadSucceed')
          uploading.value = true
          progressStatus.value = 'success'
          progressPercentage.value = 100
        },
        //文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
          // console.log('onUploadFailed')
          uploading.value = true
          progressStatus.value = 'exception'
          progressPercentage.value = 50
        },
        //文件上传进度，单位：字节
        onUploadProgress: function (uploadInfo: any, totalSize: any, loadedPercent: any) {
          // console.log('onUploadProgress')
          progressStatus.value = ''
          const progressPercent = Math.ceil(loadedPercent * 100)
          progressPercentage.value = progressPercent
          if (progressPercent === 100) {
            emit('ali-upload-success', {
              videoId: _videoId,
              fileName
            })
          }
        },
        //上传凭证或STS token超时
        onUploadTokenExpired: function (uploadInfo: any) {
          getSysVodUploadVideoByIdHandle({ videoId: uploadInfo.videoId }).then((results) => {
            const { uploadAuth } = results
            _videoId.value = uploadInfo.videoId
            uploaderObj.value.resumeUploadWithAuth(uploadAuth)
          })
          // console.log('onUploadTokenExpired')
        },
        //全部文件上传结束
        onUploadEnd: function (uploadInfo: any) {
          actionView.value = true
        }
      })
    }

    // 点击选择文件
    function chooseClickHandle() {
      if (!title.value) {
        ElMessage.warning(t('components.aliUpload.titleWarningMessage'))
        return false
      }
    }

    // 触发选择文件
    function fileChangeHandle(e: any) {
      const file = e.target.files[0]
      if (!/mp4/.test(file.name)) {
        ElMessage.warning(t('components.aliUpload.mp4WarningMessage'))
        return false
      }
      const userData = '{"Vod":{}}'
      fileName.value = file.name
      uploaderObj.value = initAliyunUpload()
      uploaderObj.value.addFile(file, null, null, null, userData)
      // 开始上传
      uploaderObj.value.startUpload()
    }

    // 查看视频
    function playHandle() {
      console.log(playView.value)
      if (!playView.value) {
        getSysVodPlayInfoHandle({
          videoId: unref(_videoId)
        }).then((results) => {
          playView.value = true
          const url = results.playInfoList[0]['playURL']
          videoUrl.value = url
        })
      }
    }

    // 删除视频
    function deleteHandle() {
      _videoId.value = ''
      fileName.value = ''
      uploading.value = false
      actionView.value = false
      playView.value = false
      videoDom.value.pause()
      emit('ali-upload-success', {
        videoId: '',
        fileName: ''
      })
    }

    watch(
      () => props.title,
      (value) => {
        title.value = value
      }
    )

    watch(
      () => props.videoId,
      (value) => {
        _videoId.value = value
        if (value) {
          actionView.value = true
        }
      }
    )

    watch(
      () => props.disabled,
      (value) => {
        disabled.value = value
      }
    )

    return {
      StyleEnum,
      uploaderObj,
      fileDom,
      fileName,
      videoDom,
      _videoId,
      uploading,
      actionView,
      playView,
      videoUrl,
      chooseClickHandle,
      progressStatus,
      progressPercentage,
      fileChangeHandle,
      playHandle,
      deleteHandle
    }
  }
})
</script>