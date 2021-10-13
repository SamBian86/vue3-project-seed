<template>
  <el-form
    ref="ruleForm"
    :model="surveyHospitalMedical"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="StyleEnum.FORM_LABEL_WIDTH"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalSurvey.patientName')" prop="patientName">
          {{ surveyHospitalMedical.patientName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalSurvey.sex')" prop="sex">
          {{ surveyHospitalMedical.sex }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalSurvey.age')" prop="age">
          {{ surveyHospitalMedical.age }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalSurvey.time')" prop="time">
          {{ surveyHospitalMedical.time }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalSurvey.projectName')" prop="projectName">
          {{ surveyHospitalMedical.projectName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalSurvey.sampleType')" prop="sampleType">
          {{ surveyHospitalMedical.sampleType }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalSurvey.inspector')" prop="inspector">
          {{ surveyHospitalMedical.inspector }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalSurvey.auditor')" prop="auditor">
          {{ surveyHospitalMedical.auditor }}
        </el-form-item>
      </el-col>
    </el-row>
    <el-row
      :gutter="StyleEnum.ROW_GUTTER"
      v-if="surveyHospitalMedical.surveyDetailsList && surveyHospitalMedical.surveyDetailsList.length !== 0"
    >
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <table style="width: 100%; text-align: center" border="1" cellspacing="0">
          <tr>
            <th width="25%">项目名称</th>
            <th width="25%">检验结果</th>
            <th width="25%">参考值</th>
            <th width="25%">指标</th>
          </tr>
          <tr v-for="(ite, idx) in surveyHospitalMedical.surveyDetailsList" :key="idx">
            <td>{{ ite.projectName }}</td>
            <td>{{ ite.nowResult }}{{ ite.unit }}</td>
            <td>{{ ite.reference }}</td>
            <td>{{ ite.markName }}</td>
          </tr>
        </table>
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
  name: 'HospitalMedicalSurvey', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { surveyHospitalMedical, getSurveyHospitalMedicalByIdHandle, formPageResetHandle } = useHospitalMedicalRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)

    getSurveyHospitalMedicalByIdHandle(props.pageParams)

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
      const cFormData = unref(surveyHospitalMedical)
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
      surveyHospitalMedical,
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
