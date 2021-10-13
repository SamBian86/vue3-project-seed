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
        <el-form-item :label="$t('PensionMaintenanceworker.employeeId')" prop="employeeId">
          <el-input
            v-model="formData.name"
            :placeholder="$t('PensionMaintenanceworker.employeeIdPlaceHolder')"
            readonly
            clearable
          >
            <template #append>
              <el-button type="primary" @click="chooseHandle" :size="StyleEnum.BUTTON_SIZE">
                {{ $t('PensionMaintenanceworker.choose') }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceworker.position')" prop="position">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.position"
            :placeholder="$t('PensionMaintenanceworker.positionPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('maintenancePosition', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceworker.communityIds')" prop="communityIds">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.communityIds"
            :placeholder="$t('PensionMaintenanceworker.communityIdsPlaceHolder')"
            multiple
            filterable
            clearable
          >
            <el-option v-for="item in sysCommunityListAll" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
  <DialogPage ref="dialogPage">
    <template #body>
      <EmployeeTable :page-params="employeeTablePageParams" @hide-dialog="hideDialog" @set-handle="setHandle" />
    </template>
    <template #title>
      {{ $t('SysDept.pageTitle') }}
    </template>
  </DialogPage>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, watch, unref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { StyleEnum } from '/@/enums/styleEnum'
import { mapGetters } from 'vuex'
// components
import { DialogPage } from '/@/components/DialogPage'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
import useDialogPageComponent from '/@/hooks/component/dialogPage'
// API封装
import usePensionMaintenanceworkerRepository from './usePensionMaintenanceworkerRepository' // 模板修改标记
import useSysCommunityRepository from '/@/views/pages/sys/community/useSysCommunityRepository'
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
// 页面
import EmployeeTable from '/@/views/pages/common/employee.vue'
export default defineComponent({
  name: 'PensionMaintenanceworkerForm', // 模板修改标记
  mixins: [formMixin],
  components: { DialogPage, EmployeeTable },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const {
      formData,
      createPensionMaintenanceworkerHandle,
      updatePensionMaintenanceworkerHandle,
      getPensionMaintenanceworkerByIdHandle,
      formPageResetHandle
    } = usePensionMaintenanceworkerRepository() // 模板修改标记
    const { sysCommunityListAll, getSysCommunityListAllHandle } = useSysCommunityRepository()
    getSysCommunityListAllHandle()
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
          getPensionMaintenanceworkerByIdHandle(params, hideSkeleton) // 模板修改标记
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
      employeeId: [{ required: true, message: t('PensionMaintenanceworker.employeeIdPlaceHolder'), trigger: 'change' }], // 模板修改标记
      position: [{ required: true, message: t('PensionMaintenanceworker.positionPlaceHolder'), trigger: 'change' }],
      communityIds: [{ required: true, message: t('PensionMaintenanceworker.communityIdsPlaceHolder'), trigger: 'change' }]
    }

    const dialogPage = ref(null)
    const { showDialog, hideDialog } = useDialogPageComponent(dialogPage)
    const employeeTablePageParams = ref({})
    // 选择人员
    function chooseHandle() {
      employeeTablePageParams.value.employeeId = formData.value.employeeId ? formData.value.employeeId : ''
      employeeTablePageParams.value.actionTag = 'isMaintenanceWorker' // 是否维修人员
      showDialog()
    }

    // 设置维修人员
    function setHandle(item: any) {
      const { id, name } = item
      formData.value.employeeId = id
      formData.value.name = name
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createPensionMaintenanceworkerHandle : updatePensionMaintenanceworkerHandle // 模板修改标记
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
      sysCommunityListAll,
      chooseHandle,
      dialogPage,
      hideDialog,
      employeeTablePageParams,
      setHandle
    }
  }
})
</script>
