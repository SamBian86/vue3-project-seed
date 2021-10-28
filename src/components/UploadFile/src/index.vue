<template>
  <div class="form_item_upload_file_container">
    <div class="form_item_upload_file_wrapper_container" v-if="items.length !== 0">
      <div v-for="(item, idx) in items" class="form_item_upload_file_item">
        <!-- 图片 -->
        <div
          class="form_item_upload_image_wrapper"
          v-if="item.suffix === 'jpg' || item.suffix === 'jpeg' || item.suffix === 'png' || item.suffix === 'gif'"
        >
          <el-image
            class="form_item_upload_image"
            :style="styleText"
            :src="item.url"
            :fit="'cover'"
            :preview-src-list="[item.url]"
            :data-idx="idx"
            @dragstart="dragStartHandle($event)"
            @drop="dropHandle($event)"
            @dragover="dropOverHandle($event)"
          >
            <template #error>
              <div class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </template>
          </el-image>
          <i v-if="!disabled" class="form_item_upload_delete el-icon-close" @click="deleteHandle(item.url)"></i>
          <div class="form_item_upload_item_type">
            <el-image class="form_item_upload_item_type_image" :src="files[item.suffix]"></el-image>
          </div>
        </div>
        <!-- 文件容器 -->
        <div
          class="form_item_upload_file_wrapper"
          v-else-if="
            item.suffix === 'ppt' ||
            item.suffix === 'xls' ||
            item.suffix === 'xlsx' ||
            item.suffix === 'doc' ||
            item.suffix === 'zip'
          "
        >
          <div class="form_item_upload_file">{{ item.url }}</div>
          <i v-if="!disabled" class="form_item_upload_delete el-icon-close" @click="deleteHandle(item.url)"></i>
          <div class="form_item_upload_item_type">
            <el-image class="form_item_upload_item_type_image" :src="files[item.suffix]"></el-image>
          </div>
        </div>
        <!-- 视频容器 -->
        <div class="form_item_upload_image_wrapper" v-else-if="item.suffix === 'mp4'">
          <el-image
            class="form_item_upload_image"
            :src="mp4_temp"
            :fit="'cover'"
            :data-idx="idx"
            @click="dialogHandle('video', 'showDialog', item)"
            @dragstart="dragStartHandle($event)"
            @drop="dropHandle($event)"
            @dragover="dropOverHandle($event)"
          >
            <template #error>
              <div class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </template>
          </el-image>
          <i v-if="!disabled" class="form_item_upload_delete el-icon-close" @click="deleteHandle(item.url)"></i>
          <div class="form_item_upload_item_type">
            <el-image class="form_item_upload_item_type_image" :src="files[item.suffix]"></el-image>
          </div>
        </div>
        <!-- 音频容器 -->
        <div class="form_item_upload_audio_wrapper" v-else-if="item.suffix === 'mp3'">
          <div class="form_item_upload_file">audio.mp3</div>
          <i v-if="!disabled" class="form_item_upload_delete el-icon-close" @click="deleteHandle(item.url)"></i>
          <div class="form_item_upload_item_type">
            <el-image class="form_item_upload_item_type_image" :src="files[item.suffix]"></el-image>
          </div>
        </div>
        <!-- 未知格式 -->
        <div class="form_item_upload_unknown_wrapper" v-else>
          <div class="form_item_upload_file">{{ item.url }}</div>
          <i v-if="!disabled" class="form_item_upload_delete el-icon-close" @click="deleteHandle(item.url)"></i>
          <!-- <div class="form_item_upload_item_type">
            <el-image class="form_item_upload_item_type_image" :src="files[item.suffix]"></el-image>
          </div> -->
        </div>
      </div>
    </div>
    <div class="form_item_upload_file_wrapper_container" v-if="items.length === 0">暂无上传</div>
    <el-upload
      v-if="(!disabled && type === 'many') || (!disabled && type === 'one' && items.length === 0)"
      ref="UploadFile"
      class="form_item_upload_file"
      :auto-upload="false"
      :show-file-list="false"
      :accept="accept"
      :on-change="changeHandle"
      list-type="picture-card"
    >
      <template #default>{{ $t('components.uploadFile.upload') }}</template>
    </el-upload>
  </div>
  <DialogPage ref="videoDialogPage" :custom-class="'video-dialog-page'" :fullscreen="false" :width="500">
    <template v-slot:body>
      <div class="form_item_upload_file_video_container">
        <video :src="videoDialogParams.url" controls></video>
      </div>
    </template>
    <template #title></template>
  </DialogPage>
</template>

<script lang="ts">
import { defineComponent, ref, watch, unref } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import props from './props'
// components
import { DialogPage } from '/@/components/DialogPage'
// hooks
import useDialogPageComponent from '/@/hooks/component/dialogPage'
import png from '/@/assets/images/files/file_png.png'
import ppt from '/@/assets/images/files/file_ppt.png'
import mp3 from '/@/assets/images/files/file_mp3.png'
import mp4 from '/@/assets/images/files/file_mp4.png'
import xls from '/@/assets/images/files/file_xls.png'
import xlsx from '/@/assets/images/files/file_xls.png'
import jpg from '/@/assets/images/files/file_jpg.png'
import jpeg from '/@/assets/images/files/file_jpg.png'
import doc from '/@/assets/images/files/file_doc.png'
import zip from '/@/assets/images/files/file_zip.png'
import mp4_temp from '/@/assets/images/files/mp4_temp.png'
// API封装
import useOssFileRepository from '/@/views/pages/oss/file/useOssFileRepository' // 模板修改标记
export default defineComponent({
  name: 'UploadFile',
  props: { ...props },
  components: {
    DialogPage
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    let uploadApi = props.uploadApi
    const disabled = ref(props.disabled)
    const type = ref(props.type)
    const styleText = ref(props.styleText)
    const items = ref(formatFiles(props.items))
    const acceptFileObj = {
      image: '.png, .jpg, .jpeg, .gif',
      imageAndVideo: '.png, .jpg, .jpeg, .gif, .mp4'
    }
    const accept = ref(acceptFileObj[props.acceptFile])

    console.log(items)
    const files = ref({
      png,
      ppt,
      mp3,
      mp4,
      xls,
      xlsx,
      jpg,
      jpeg,
      doc,
      zip
    })
    const { uploadOssFileHandle } = useOssFileRepository() // 模板修改标记
    if (!uploadApi) {
      uploadApi = uploadOssFileHandle
    }

    watch(
      () => props.items,
      (value) => {
        items.value = formatFiles(value)
      }
    )

    watch(
      () => props.disabled,
      (value) => {
        disabled.value = value
      }
    )

    function changeHandle(file: any) {
      uploadApi({ file: file.raw }).then((response: any) => {
        const { results } = response.data
        if (type.value === 'one') {
          items.value = [{ url: results.url }]
          emit('success-callback', [{ ...results }])
        }
        if (type.value === 'many') {
          items.value.push(results)
          items.value = formatFiles(unref(items))
          emit('success-callback', unref(items))
        }
        // emit('success-callback', results)
        ElMessage.success(t('components.uploadFileButton.successMessage'))
      })
      // console.log(fileList)
    }

    function formatFiles(items: any) {
      items.forEach((item: any) => {
        const reg = /\.([^\.]+$)/g
        const m = reg.exec(item.url)
        if (m) {
          item.suffix = m[1]
          switch (item.suffix) {
            case 'jpeg':
            case 'jpg':
            case 'png':
            case 'gif':
              item.fileType = 1 // 图片
              break
            case 'mp3':
              item.fileType = 2 // 视频
              break
            default:
              item.fileType = ''
              break
          }
        }
      })
      return items
    }

    function deleteHandle(url: any) {
      const _items = unref(items)
      const idx = _items.findIndex((item: any) => item.url === url)
      if (idx !== -1) {
        _items.splice(idx, 1)
      }
      emit('success-callback', _items)
    }

    // 拖拽功能
    function dragStartHandle(event: any) {
      if (disabled.value) {
        return
      }
      event.dataTransfer.setData('Text', event.target.dataset.idx)
    }

    function dropHandle(event: any) {
      if (disabled.value) {
        return
      }
      event.preventDefault()
      const start = event.dataTransfer.getData('Text')
      const end = event.target.dataset.idx

      const _items = unref(items)
      const temp = _items[end]
      _items[end] = _items[start]
      _items[start] = temp
      emit('success-callback', _items)
    }

    function dropOverHandle(event: any) {
      if (disabled.value) {
        return
      }
      event.preventDefault()
    }

    // 查看视频功能
    // dialogPage相关代码开始
    const videoDialogPage = ref(null)
    const videoDialogParams = ref('')
    const videoDialogComponent = useDialogPageComponent(videoDialogPage)
    function dialogHandle(name: any, action: any, item: any) {
      const dialogPageComponent = {
        video: videoDialogComponent
      }
      if (item) {
        videoDialogParams.value = item
      }
      dialogPageComponent[name][action]()
    }
    // const { showDialog, hideDialog } = useDialogPageComponent(videoDialogPage)

    return {
      disabled,
      styleText,
      items,
      accept,
      files,
      mp4_temp,
      type,
      changeHandle,
      deleteHandle,
      dragStartHandle,
      dropHandle,
      dropOverHandle,
      videoDialogPage,
      videoDialogParams,
      dialogHandle
    }
  }
})
</script>