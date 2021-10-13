<template>
  <div class="component-skeleton-page">
    <h4>疫情介绍</h4>
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
          <el-form-item :label="$t('PensionEpidemicsituation.details')" prop="details">
            <Tinymce
              ref="tinymce"
              :data="formData.details"
              :height="'400'"
              :placeholder="$t('PensionEpidemicsituation.detailsPlaceHolder')"
              @content-change-handle="contentChangeHandle"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
          <el-form-item>
            <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
              {{ $t('form.submit') }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, watch, unref, onMounted, onActivated, onDeactivated } from 'vue'
import { useI18n } from 'vue-i18n'
import { StyleEnum } from '/@/enums/styleEnum'
import { mapGetters } from 'vuex'
// components
import { Tinymce } from '/@/components/Tinymce'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import usePensionEpidemicsituationRepository from './usePensionEpidemicsituationRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionEpidemicsituationForm', // 模板修改标记
  mixins: [formMixin],
  components: { Tinymce },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const details = ref('')
    const { formData, createPensionEpidemicsituationHandle, getPensionEpidemicsituationByIdHandle, formPageResetHandle } =
      usePensionEpidemicsituationRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)

    setTimeout(() => {
      getPensionEpidemicsituationByIdHandle().then((response) => {
        details.value = response.details
      }) // 模板修改标记
    }, 500)

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据
    // 模板修改标记

    // 校验
    const rules = {
      details: [{ required: true, message: t('PensionEpidemicsituation.detailsPlaceHolder'), trigger: 'blur' }] // 模板修改标记
    }

    function contentChangeHandle(value: any) {
      details.value = value
      formData.value.details = value
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = createPensionEpidemicsituationHandle // 模板修改标记
      const cFormData = unref(formData)
      delete cFormData.id
      formPageSubmitHandle(cMethod, cFormData, () => {
        // emit('update-table')
        // emit('hide-dialog')
        // emit('show-skeleton')
      })
    }

    return {
      // 基础支持
      StyleEnum,
      // 表单数据
      formData,
      pageType,
      rules,
      details,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      contentChangeHandle
    }
  }
})
</script>
