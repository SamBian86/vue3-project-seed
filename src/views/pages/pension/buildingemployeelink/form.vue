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
        <el-form-item :label="$t('PensionBuilding.deptId')" prop="deptId">
          <el-cascader
            :class="'form-page-cascader'"
            v-model="formData.deptId"
            :options="sysDeptTree"
            :props="cascaderProps"
            :placeholder="$t('PensionBuilding.deptIdPlaceHolder')"
            @change="deptAndDutyChangeHandle"
          ></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionBuilding.dutyId')" prop="dutyId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.dutyId"
            :placeholder="$t('PensionBuilding.dutyIdPlaceHolder')"
            @change="deptAndDutyChangeHandle"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('employeeduty')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionBuilding.employeeId')" prop="employeeId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.employeeId"
            :placeholder="$t('PensionBuilding.employeeIdPlaceHolder')"
            filterable
            clearable
          >
            <el-option v-for="item in pensionEmployeeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
import usePensionBuildingemployeelinkRepository from '../buildingemployeelink/usePensionBuildingemployeelinkRepository' // 模板修改标记
import useSysDeptRepository from '/@/views/pages/sys/dept/useSysDeptRepository' // 模板修改标记
import usePensionEmployeeRepository from '/@/views/pages/pension/employee/usePensionEmployeeRepository' // 模板修改标记
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionBuildingemployeelinkForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const { formData, createPensionBuildingemployeelinkHandle } = usePensionBuildingemployeelinkRepository() // 模板修改标记
    const { sysDeptTree, getSysDeptTreeHandle } = useSysDeptRepository()
    getSysDeptTreeHandle()
    const { pensionEmployeeList, getPensionEmployeeListHandle } = usePensionEmployeeRepository()
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)

    // 校验
    const rules = {
      deptId: [{ required: true, message: t('PensionBuilding.deptIdPlaceHolder'), trigger: 'change' }], // 模板修改标记
      dutyId: [{ required: true, message: t('PensionBuilding.dutyIdPlaceHolder'), trigger: 'change' }],
      employeeId: [{ required: true, message: t('PensionBuilding.employeeIdPlaceHolder'), trigger: 'change' }]
    }

    const cascaderProps = ref({
      label: 'label',
      value: 'id',
      checkStrictly: true,
      emitPath: false
    })

    function deptAndDutyChangeHandle() {
      const { deptId, dutyId } = formData.value
      getPensionEmployeeListHandle({ deptId, dutyId })
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = createPensionBuildingemployeelinkHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, { ...props.pageParams, ...cFormData }, () => {
        emit('before-close')
      })
    }

    return {
      // 基础支持
      StyleEnum,
      // 表单数据
      formData,
      rules,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      cascaderProps,
      sysDeptTree,
      pensionEmployeeList,
      deptAndDutyChangeHandle
    }
  }
})
</script>
