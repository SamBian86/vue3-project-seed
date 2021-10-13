<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="StyleEnum.FORM_LABEL_WIDTH"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOwnerfeedback.completeRemark')" prop="completeRemark">
          <el-input
            type="textarea"
            :rows="10"
            v-model="formData.completeRemark"
            :placeholder="$t('PensionOwnerfeedback.completeRemarkPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item v-if="pageType === 'create' || pageType === 'update'">
          <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
            {{ $t('form.submit') }}
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
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
import usePensionOwnerfeedbackRepository from './usePensionOwnerfeedbackRepository' // 模板修改标记
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionOwnerfeedbackForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, completePensionOwnerfeedbackByIdHandle } = usePensionOwnerfeedbackRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)

    // 校验
    const rules = {
      completeRemark: [{ required: true, message: t('PensionOwnerfeedback.completeRemarkPlaceHolder'), trigger: 'blur' }] // 模板修改标记
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = completePensionOwnerfeedbackByIdHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, { ...cFormData, id: props.pageParams.id }, () => {
        emit('before-close')
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
