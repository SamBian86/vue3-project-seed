<template>
  <el-form
    ref="ruleForm"
    :model="historyHospitalMedical"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="StyleEnum.FORM_LABEL_WIDTH"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalHistory.patientName')" prop="patientName">
          {{ historyHospitalMedical.patientName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalHistory.sex')" prop="sex">
          {{ historyHospitalMedical.sex }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalHistory.age')" prop="age">
          {{ historyHospitalMedical.age }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalHistory.idCard')" prop="idCard">
          {{ historyHospitalMedical.idCard }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalHistory.phone')" prop="phone">
          {{ historyHospitalMedical.phone }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalHistory.residentialAddress')" prop="residentialAddress">
          {{ historyHospitalMedical.residentialAddress }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalHistory.deptName')" prop="deptName">
          {{ historyHospitalMedical.deptName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalHistory.doctorName')" prop="doctorName">
          {{ historyHospitalMedical.doctorName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalHistory.time')" prop="time">
          {{ historyHospitalMedical.time }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalHistory.mainAction')" prop="mainAction">
          {{ historyHospitalMedical.mainAction }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalHistory.primaryDiagnosis')" prop="primaryDiagnosis">
          {{ historyHospitalMedical.primaryDiagnosis }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalHistory.measures')" prop="measures">
          {{ historyHospitalMedical.measures }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalHistory.pastHistory')" prop="pastHistory">
          {{ historyHospitalMedical.pastHistory }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalHistory.presentHistory')" prop="presentHistory">
          {{ historyHospitalMedical.presentHistory }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalHistory.physicalExamination')" prop="physicalExamination">
          {{ historyHospitalMedical.physicalExamination }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalHistory.laboratoryTest')" prop="laboratoryTest">
          {{ historyHospitalMedical.laboratoryTest }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalMedicalHistory.remark')" prop="remark">
          {{ historyHospitalMedical.remark }}
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
  name: 'HospitalMedicalHistory', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { historyHospitalMedical, getHistoryHospitalMedicalByIdHandle, formPageResetHandle } = useHospitalMedicalRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)

    getHistoryHospitalMedicalByIdHandle(props.pageParams)

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
      const cFormData = unref(historyHospitalMedical)
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
      historyHospitalMedical,
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
