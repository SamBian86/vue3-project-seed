<template>
  <el-form ref="ruleForm" :model="formData" :rules="rules" :size="StyleEnum.FORM_SIZE" :label-width="StyleEnum.FORM_LABEL_WIDTH">
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalExamination.name')" prop="name">
          {{ formData.name }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalExamination.phoneNumber')" prop="phoneNumber">
          {{ formData.phoneNumber }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalExamination.cardNo')" prop="cardNo">
          {{ formData.cardNo }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalExamination.archiveNo')" prop="archiveNo">
          {{ formData.archiveNo }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalExamination.examinationDoctor')" prop="examinationDoctor">
          {{ formData.examinationDoctor }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalExamination.examinationNo')" prop="examinationNo">
          {{ formData.examinationNo }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalExamination.examinationTime')" prop="examinationTime">
          {{ formData.examinationTime }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('HospitalExamination.examinationType')" prop="examinationType">
          {{ formData.examinationType }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalExamination.examinationReview')" prop="examinationReview">
          {{ formData.examinationReview }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalExamination.healthAdvice')" prop="healthAdvice">
          {{ formData.healthAdvice }}
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider v-if="formData.projectDTOList && formData.projectDTOList.length !== 0" content-position="left">
      {{ $t('HospitalExamination.table') }}
    </el-divider>
    <el-row
      :gutter="StyleEnum.ROW_GUTTER"
      v-for="(item, index) in formData.projectDTOList"
      :key="index"
      class="row-table-container"
    >
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('HospitalExamination.projectNum')" prop="projectNum">{{ item.projectNum }}</el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('HospitalExamination.projectName')" prop="projectName">{{ item.projectName }}</el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('HospitalExamination.examiner')" prop="examiner">{{ item.examiner }}</el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('HospitalExamination.examineDate')" prop="examineDate">
          {{ item.examineDate }}
          <el-button type="text" @click="displayHandle(index)" :disabled="false" :size="StyleEnum.BUTTON_SIZE">
            {{ !item.display ? $t('HospitalExamination.show') : $t('HospitalExamination.hide') }}
          </el-button>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24" v-show="item.display">
        <table style="width: 100%; text-align: center" border="1" cellspacing="0">
          <tr>
            <th>检查项目</th>
            <th>检查结果</th>
            <th>参考值</th>
            <th>提示</th>
            <th>影像视检</th>
            <th>诊断建议</th>
          </tr>
          <tr v-for="(ite, idx) in item.details" :key="idx">
            <td>{{ ite.sonProjectName }}</td>
            <td>{{ ite.result }}{{ ite.unit }}</td>
            <td>{{ ite.referenceValue }}</td>
            <td>{{ ite.prompt }}</td>
            <td>{{ ite.imageVisual }}</td>
            <td>{{ ite.diagnosticAdvice }}</td>
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
import useHospitalExaminationRepository from './useHospitalExaminationRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'HospitalExaminationForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, getHospitalExaminationByIdHandle, formPageResetHandle } = useHospitalExaminationRepository() // 模板修改标记
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

        // console.log('already')
        // 修改变成创建
        if (type === 'create') {
          formPageResetHandle(hideSkeleton)
          defaultConfigHandle()
        }
        if (type === 'update' || type === 'detail') {
          getHospitalExaminationByIdHandle(params, hideSkeleton).then((response) => {
            response.results.projectDTOList &&
              response.results.projectDTOList.forEach((item: any) => {
                item.display = false
              })
            formData.value = response.results
          }) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据
    // 模板修改标记

    // 校验
    const rules = {
      // bbb: [{ required: true, message: t('AAA.bbbPlaceHolder'), trigger: 'blur' }] // 模板修改标记
    }

    // 展开隐藏
    function displayHandle(index: any) {
      formData.value.projectDTOList[index]['display'] = !formData.value.projectDTOList[index]['display']
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = null // 模板修改标记
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
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      displayHandle
    }
  }
})
</script>
