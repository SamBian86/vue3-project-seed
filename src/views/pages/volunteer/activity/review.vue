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
        <el-form-item :label="$t('VolunteerActivity.reviewUrl')" prop="reviewUrl">
          <el-input v-model="formData.reviewUrl" :placeholder="$t('VolunteerActivity.reviewUrlPlaceHolder')" clearable></el-input>
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
import { mapGetters } from 'vuex'
// components
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useVolunteerActivityRepository from './useVolunteerActivityRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'VolunteerActivityReview', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, reviewVolunteerActivityHandle, formPageResetHandle } = useVolunteerActivityRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    formData.value.reviewUrl = props.pageParams.reviewUrl
    formData.value.id = props.pageParams.id

    // 相关页面基础数据
    // 模板修改标记

    // 校验
    const rules = {
      reviewUrl: [{ required: true, message: t('VolunteerActivity.reviewUrlPlaceHolder'), trigger: 'blur' }] // 模板修改标记
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = reviewVolunteerActivityHandle
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, cFormData, () => {
        // emit('update-table')
        emit('hide-dialog')
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
