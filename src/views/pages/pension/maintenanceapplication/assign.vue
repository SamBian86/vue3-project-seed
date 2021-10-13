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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.executorId')" prop="executorId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.executorId"
            :placeholder="$t('PensionMaintenanceapplication.executorIdPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in pensionMaintenanceworkerList"
              :key="item.userId"
              :label="item.name"
              :value="item.userId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.expectedTime')" prop="expectedTime">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.expectedTime"
            :placeholder="$t('PensionMaintenanceapplication.expectedTimePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('expectedRepairTime')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionMaintenanceapplication.appointRemark')" prop="appointRemark">
          <el-input
            type="textarea"
            :rows="10"
            v-model="formData.appointRemark"
            :placeholder="$t('PensionMaintenanceapplication.appointRemarkPlaceHolder')"
            clearable
          ></el-input>
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
import usePensionMaintenanceworkerRepository from '/@/views/pages/pension/maintenanceworker/usePensionMaintenanceworkerRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionMaintenanceapplicationAssign', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const { formData, assignPensionMaintenanceapplicationByIdHandle } = usePensionMaintenanceapplicationRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)

    // getPensionMaintenanceworkerListByIdHandle usePensionMaintenanceworkerRepository
    const { pensionMaintenanceworkerList, getPensionMaintenanceworkerListByIdHandle } = usePensionMaintenanceworkerRepository()
    getPensionMaintenanceworkerListByIdHandle({
      id: props.pageParams.communityId
    })
    // 校验
    const rules = {
      executorId: [{ required: true, message: t('PensionMaintenanceapplication.executorIdPlaceHolder'), trigger: 'change' }], // 模板修改标记
      expectedTime: [{ required: true, message: t('PensionMaintenanceapplication.expectedTimePlaceHolder'), trigger: 'change' }]
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = assignPensionMaintenanceapplicationByIdHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, { ...cFormData, ...props.pageParams }, () => {
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
      pensionMaintenanceworkerList
    }
  }
})
</script>
