<template>
  <el-upload
    ref="uploadFileButton"
    class="table_search_button_upload"
    :auto-upload="false"
    :show-file-list="false"
    :on-change="changeHandle"
  >
    <slot></slot>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import props from './props'
// API封装
import useOssFileRepository from '/@/views/pages/oss/file/useOssFileRepository' // 模板修改标记
export default defineComponent({
  name: 'UploadFileButton',
  props: { ...props },
  setup(props, { emit }) {
    const { t } = useI18n()
    let uploadApi = props.uploadApi
    const { uploadOssFileHandle } = useOssFileRepository() // 模板修改标记
    if (!uploadApi) {
      uploadApi = uploadOssFileHandle
    }
    function changeHandle(file: any) {
      uploadApi({ file: file.raw }).then((response: any) => {
        emit('success-callback')
        ElMessage.success(t('components.uploadFileButton.successMessage'))
      })
      // console.log(fileList)
    }

    return {
      changeHandle
    }
  }
})
</script>