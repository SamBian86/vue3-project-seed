<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="StyleEnum.FORM_LABEL_WIDTH"
    :disabled="pageType === 'detail'"
  >
    <el-form-item :label="$t('SysConfig.paramKey')" prop="paramKey">
      <el-input v-model="formData.paramKey" :placeholder="$t('SysConfig.paramKeyPlaceHolder')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('SysConfig.paramValue')" prop="paramValue">
      <el-input v-model="formData.paramValue" :placeholder="$t('SysConfig.paramValuePlaceHolder')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('SysConfig.remark')" prop="remark">
      <el-input type="textarea" v-model="formData.remark" :placeholder="$t('SysConfig.remarkPlaceHolder')"></el-input>
    </el-form-item>
    <el-form-item v-if="pageType === 'create' || pageType === 'update'">
      <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
        {{ $t('form.submit') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, watch, unref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { StyleEnum } from '/@/enums/styleEnum'
// components
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysConfigRepository from './useSysConfigRepository' // 模板修改标记
// mixin
import formMixin from '/@/mixins/formMixin'
export default defineComponent({
  name: 'SysConfigForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createSysConfigHandle, updateSysConfigHandle, getSysConfigByIdHandle, formPageResetHandle } =
      useSysConfigRepository() // 模板修改标记
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
        // 修改变成创建
        if (type === 'create') {
          formPageResetHandle(hideSkeleton)
          defaultConfigHandle()
        }
        if (type === 'update' || type === 'detail') {
          getSysConfigByIdHandle(params, hideSkeleton) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------

    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据

    // 校验
    const rules = {
      paramKey: [{ required: true, message: t('SysConfig.paramKeyPlaceHolder'), trigger: 'blur' }], // 模板修改标记
      paramValue: [{ required: true, message: t('SysConfig.paramValuePlaceHolder'), trigger: 'blur' }] // 模板修改标记
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createSysConfigHandle : updateSysConfigHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, cFormData, () => {
        emit('update-table')
        emit('show-skeleton')
      })
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
      submitHandle
    }
  }
})
</script>
