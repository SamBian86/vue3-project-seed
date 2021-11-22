<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="150"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <el-divider content-position="left">{{ $t('PensionOwnerfeedback.ownerTitle') }}</el-divider>

      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOwnerfeedback.ownerName')" prop="ownerName">
          <el-input v-model="formData.ownerName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOwnerfeedback.ownerPhone')" prop="ownerPhone">
          <el-input v-model="formData.ownerPhone" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-divider content-position="left">{{ $t('PensionOwnerfeedback.feedBackInfoTitle') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOwnerfeedback.applyTime')" prop="applyTime">
          <el-input v-model="formData.applyTime" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOwnerfeedback.applyTypeName')" prop="applyTypeName">
          <el-input v-model="formData.applyTypeName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOwnerfeedback.details')" prop="details">
          <el-input type="textarea" :rows="10" v-model="formData.details" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOwnerfeedback.ossLinks')" prop="ossLinks">
          <UploadFile
            ref="uploadFile"
            :type="'many'"
            :items="oss"
            :style-text="'width: 200px;'"
            :disabled="pageType === 'detail'"
            @success-callback="uploadSuccessHandle"
          ></UploadFile>
        </el-form-item>
      </el-col>
      <el-divider content-position="left">{{ $t('PensionOwnerfeedback.dealInfoTitle') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOwnerfeedback.statusName')" prop="statusName">
          <el-input v-model="formData.statusName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOwnerfeedback.acceptName')" prop="acceptName">
          <el-input v-model="formData.acceptName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOwnerfeedback.acceptPhone')" prop="acceptPhone">
          <el-input v-model="formData.acceptPhone" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOwnerfeedback.acceptTime')" prop="acceptTime">
          <el-input v-model="formData.acceptTime" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOwnerfeedback.acceptUseTime')" prop="acceptUseTime">
          <el-input v-model="formData.acceptUseTime" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOwnerfeedback.completeTime')" prop="completeTime">
          <el-input v-model="formData.completeTime" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOwnerfeedback.completeUseTime')" prop="completeUseTime">
          <el-input v-model="formData.completeUseTime" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOwnerfeedback.completeRemark')" prop="completeRemark">
          <el-input type="textarea" :rows="10" v-model="formData.completeRemark" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-divider content-position="left">{{ $t('PensionOwnerfeedback.scoreTitle') }}</el-divider>

      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOwnerfeedback.ownerScore')" prop="ownerScore">
          <el-input v-model="formData.ownerScore" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOwnerfeedback.ownerAppraisalContent')" prop="ownerAppraisalContent">
          <el-input type="textarea" :rows="10" v-model="formData.ownerAppraisalContent" clearable></el-input>
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
import { UploadFile } from '/@/components/UploadFile'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import usePensionOwnerfeedbackRepository from './usePensionOwnerfeedbackRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionOwnerfeedbackDetail', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const oss = ref([])
    const pageType = ref(props.pageType)
    const { formData, createPensionOwnerfeedbackHandle, getPensionOwnerfeedbackByIdHandle, formPageResetHandle } =
      usePensionOwnerfeedbackRepository() // 模板修改标记
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

    if (pageType.value === 'detail') {
      getPensionOwnerfeedbackByIdHandle(props.pageParams, hideSkeleton).then((response: any) => {
        const { ossLinkList } = response
        if (ossLinkList) {
          oss.value = ossLinkList
        } else {
          oss.value = []
        }
      }) // 模板修改标记
    }

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据
    // 模板修改标记

    // 校验
    const rules = {
      // bbb: [{ required: true, message: t('AAA.bbbPlaceHolder'), trigger: 'blur' }] // 模板修改标记
    }

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      oss.value = items
      // many
      if (items.length !== 0) {
        formData.value.ossLinkList = items
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createPensionOwnerfeedbackHandle : updatePensionOwnerfeedbackHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, cFormData, () => {
        emit('update-table')
        emit('hide-dialog')
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
      oss,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      uploadSuccessHandle
    }
  }
})
</script>
