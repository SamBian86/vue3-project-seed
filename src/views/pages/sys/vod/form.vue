<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
      <el-form
        ref="ruleForm"
        :model="formData"
        :rules="rules"
        :size="StyleEnum.FORM_SIZE"
        :label-width="StyleEnum.FORM_LABEL_WIDTH"
        :disabled="pageType === 'detail'"
      >
        <el-form-item :label="$t('SysVod.title')" prop="title">
          <el-input v-model="formData.title" :placeholder="$t('SysVod.titlePlaceHolder')" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('SysVod.videoId')" prop="videoId">
          <AliUpload
            :title="formData.title"
            :video-id="formData.videoId"
            :disabled="pageType === 'detail'"
            @ali-upload-success="aliUploadSuccessHandle"
          />
        </el-form-item>

        <el-form-item v-if="pageType === 'create' || pageType === 'update'">
          <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
            {{ $t('form.submit') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, watch, unref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { StyleEnum } from '/@/enums/styleEnum'
import { mapGetters } from 'vuex'
// components
import { AliUpload } from '/@/components/AliUpload'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysVodRepository from './useSysVodRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
export default defineComponent({
  name: 'SysVodForm', // 模板修改标记
  mixins: [formMixin],
  components: { AliUpload },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createSysVodHandle, updateSysVodHandle, getSysVodByIdHandle, formPageResetHandle } = useSysVodRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)
    // 延迟显示方法
    const hideSkeleton = () => {
      setTimeout(() => {
        emit('hide-skeleton')
      }, StyleEnum.FORM_SKELETON_TIME)
    }

    // 显示方法
    const showSkeleton = () => {
      emit('show-skeleton')
    }

    onMounted(() => {
      // 监听当前组件的pageType、pageParams改变时的处理，默认先显示skeleton
      watch([() => props.pageType, () => props.pageParams], ([type, params], [prevType, prevParams]) => {
        showSkeleton()

        // console.log('already')
        // 修改变成创建
        if (type === 'create') {
          formPageResetHandle(hideSkeleton)
          defaultConfigHandle()
        }
        if (type === 'update' || type === 'detail') {
          getSysVodByIdHandle(params, hideSkeleton) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据
    // 模板修改标记

    // 校验
    const rules = {
      title: [{ required: true, message: t('SysVod.titlePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      videoId: [{ required: true, message: t('SysVod.videoIdPlaceHolder'), trigger: 'blur' }]
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createSysVodHandle : updateSysVodHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, cFormData, () => {
        emit('update-table')
        emit('hide-dialog')
        emit('show-skeleton')
      })
    }

    // 阿里云上传成功回调
    function aliUploadSuccessHandle({ videoId, fileName }) {
      formData.value.videoId = videoId
      formData.value.fileName = fileName
    }

    return {
      // 基础支持
      StyleEnum,
      // 表单数据
      formData,
      pageType,
      rules,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      aliUploadSuccessHandle
    }
  }
})
</script>
