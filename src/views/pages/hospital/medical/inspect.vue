<template>
  <el-form
    ref="ruleForm"
    :model="inspectHospitalMedical"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="StyleEnum.FORM_LABEL_WIDTH"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalInspect.patientName')" prop="patientName">
          {{ inspectHospitalMedical.patientName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalInspect.age')" prop="age">
          {{ inspectHospitalMedical.age }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalInspect.sex')" prop="sex">
          {{ inspectHospitalMedical.sex }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalInspect.receiptNos')" prop="receiptNos">
          {{ inspectHospitalMedical.receiptNos }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalInspect.projectName')" prop="projectName">
          {{ inspectHospitalMedical.projectName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalMedicalInspect.time')" prop="time">
          {{ inspectHospitalMedical.time }}
        </el-form-item>
      </el-col>
    </el-row>
    <el-row
      :gutter="StyleEnum.ROW_GUTTER"
      v-if="inspectHospitalMedical.inspectDetailsList && inspectHospitalMedical.inspectDetailsList.length !== 0"
    >
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <table style="width: 100%; text-align: center" border="1" cellspacing="0">
          <tr>
            <th width="140">检查结果项目</th>
            <th>结果描述</th>
          </tr>
          <tr v-for="(ite, idx) in inspectHospitalMedical.inspectDetailsList" :key="idx">
            <td>{{ ite.lineName }}</td>
            <td>{{ ite.nowResult }}</td>
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
  name: 'HospitalMedicalInspect', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { inspectHospitalMedical, getInspectHospitalMedicalByIdHandle, formPageResetHandle } = useHospitalMedicalRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)

    getInspectHospitalMedicalByIdHandle(props.pageParams)

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
      const cFormData = unref(inspectHospitalMedical)
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
      inspectHospitalMedical,
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
