<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="120"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <el-divider content-position="left">{{ $t('PensionMaintenanceapplication.userInfoTitle') }}</el-divider>

      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionMaintenanceapplication.userName')" prop="userName">
          <el-input v-model="formData.userName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionMaintenanceapplication.userPhoneNumber')" prop="userPhoneNumber">
          <el-input v-model="formData.userPhoneNumber" clearable></el-input>
        </el-form-item>
      </el-col>

      <el-divider content-position="left">{{ $t('PensionMaintenanceapplication.repairInfoTitle') }}</el-divider>

      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionMaintenanceapplication.applyTime')" prop="applyTime">
          <el-input v-model="formData.applyTime" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionMaintenanceapplication.applyHouse')" prop="applyHouse">
          <el-input v-model="formData.applyHouse" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.details')" prop="details">
          <el-input type="textarea" :rows="10" v-model="formData.details" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.fileList')" prop="fileList">
          <UploadFile
            ref="uploadFile"
            :type="'many'"
            :items="oss"
            :disabled="pageType === 'detail'"
            @success-callback="uploadSuccessHandle"
          ></UploadFile>
        </el-form-item>
      </el-col>

      <el-divider content-position="left">{{ $t('PensionMaintenanceapplication.progressInfoTitle') }}</el-divider>

      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.statusName')" prop="statusName">
          <el-input v-model="formData.statusName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionMaintenanceapplication.appointerName1')" prop="appointerName">
          <el-input v-model="formData.appointerName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionMaintenanceapplication.appointerPhoneNumber')" prop="appointerPhoneNumber">
          <el-input v-model="formData.appointerPhoneNumber" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionMaintenanceapplication.appointTime')" prop="appointTime">
          <el-input v-model="formData.appointTime" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionMaintenanceapplication.toApplyDuration')" prop="toApplyDuration">
          <el-input v-model="formData.toApplyDuration" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionMaintenanceapplication.executorName1')" prop="executorName">
          <el-input v-model="formData.executorName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionMaintenanceapplication.executorPhoneNumber')" prop="executorPhoneNumber">
          <el-input v-model="formData.executorPhoneNumber" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionMaintenanceapplication.completeTime')" prop="completeTime">
          <el-input v-model="formData.completeTime" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionMaintenanceapplication.toCompleteDuration')" prop="toCompleteDuration">
          <el-input v-model="formData.toCompleteDuration" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.completeComment')" prop="completeComment">
          <el-input type="textarea" :rows="10" v-model="formData.completeComment" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-divider content-position="left">{{ $t('PensionMaintenanceapplication.evaluateInfoTitle') }}</el-divider>

      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.evaluate')" prop="evaluate">
          <el-input v-model="formData.evaluate" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.evaluateComment')" prop="evaluateComment">
          <el-input type="textarea" :rows="10" v-model="formData.evaluateComment" clearable></el-input>
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
import usePensionMaintenanceapplicationRepository from './usePensionMaintenanceapplicationRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionMaintenanceapplicationForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const oss = ref([])
    const pageType = ref(props.pageType)
    const {
      formData,
      createPensionMaintenanceapplicationHandle,
      getPensionMaintenanceapplicationByIdHandle,
      formPageResetHandle
    } = usePensionMaintenanceapplicationRepository() // 模板修改标记
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

    showSkeleton()
    if (pageType.value === 'detail') {
      getPensionMaintenanceapplicationByIdHandle(props.pageParams, hideSkeleton).then((response: any) => {
        const { fileList } = response
        if (fileList) {
          oss.value = fileList
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
        formData.value.fileList = items
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = createPensionMaintenanceapplicationHandle // 模板修改标记
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
