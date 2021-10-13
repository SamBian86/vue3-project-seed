<template>
  <el-form
    ref="ruleForm"
    :model="dischargeHospitalMedical"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="StyleEnum.FORM_LABEL_WIDTH"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalDischarge.patientName')" prop="patientName">
          {{ dischargeHospitalMedical.patientName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalDischarge.sex')" prop="sex">
          {{ dischargeHospitalMedical.sex }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalDischarge.age')" prop="age">
          {{ dischargeHospitalMedical.age }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalDischarge.job')" prop="job">
          {{ dischargeHospitalMedical.job }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalDischarge.maritalStatus')" prop="maritalStatus">
          {{ dischargeHospitalMedical.maritalStatus }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalDischarge.admissionNum')" prop="admissionNum">
          {{ dischargeHospitalMedical.admissionNum }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalDischarge.ward')" prop="ward">
          {{ dischargeHospitalMedical.ward }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalDischarge.dept')" prop="dept">
          {{ dischargeHospitalMedical.dept }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalDischarge.admissionTime')" prop="admissionTime">
          {{ dischargeHospitalMedical.admissionTime }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalDischarge.doctorName')" prop="doctorName">
          {{ dischargeHospitalMedical.doctorName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalDischarge.admissionDiagnosis')" prop="admissionDiagnosis">
          {{ dischargeHospitalMedical.admissionDiagnosis }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalDischarge.admissionSituation')" prop="admissionSituation">
          {{ dischargeHospitalMedical.admissionSituation }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalDischarge.courseInHospital')" prop="courseInHospital">
          {{ dischargeHospitalMedical.courseInHospital }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalDischarge.operationName')" prop="operationName">
          {{ dischargeHospitalMedical.operationName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalDischarge.operationTime')" prop="operationTime">
          {{ dischargeHospitalMedical.operationTime }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalDischarge.dischargeDiagnosis')" prop="dischargeDiagnosis">
          {{ dischargeHospitalMedical.dischargeDiagnosis }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalDischarge.dischargeSituation')" prop="dischargeSituation">
          {{ dischargeHospitalMedical.dischargeSituation }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalDischarge.doctorAdvice')" prop="doctorAdvice">
          {{ dischargeHospitalMedical.doctorAdvice }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalDischarge.dischargeTime')" prop="dischargeTime">
          {{ dischargeHospitalMedical.dischargeTime }}
        </el-form-item>
      </el-col>
      <!-- <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
       <el-form-item v-if="pageType === 'create' || pageType === 'update'">
         <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
           {{ $t('form.submit') }}
         </el-button>
       </el-form-item>
     </el-col> -->
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
import useHospitalMedicalRepository from './useHospitalMedicalRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'HospitalMedicalDischarge', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { dischargeHospitalMedical, getDischargeHospitalMedicalByIdHandle, formPageResetHandle } =
      useHospitalMedicalRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)

    getDischargeHospitalMedicalByIdHandle(props.pageParams)

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据
    // 模板修改标记

    // 校验
    const rules = {
      // bbb: [{ required: true, message: t('AAA.bbbPlaceHolder'), trigger: 'blur' }] // 模板修改标记
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = null // 模板修改标记
      const cFormData = unref(formData)
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
      dischargeHospitalMedical,
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
