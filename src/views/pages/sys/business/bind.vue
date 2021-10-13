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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysBusiness.serverAreaIdList')" prop="serverAreaIdList">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.serverAreaIdList"
            :placeholder="$t('SysBusiness.serverAreaIdListPlaceHolder')"
            clearable
            multiple
          >
            <el-option v-for="item in sysServerareaSelect" :key="item.id" :label="item.value" :value="item.id"></el-option>
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
// components
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysBusinessRepository from './useSysBusinessRepository' // 模板修改标记
import useSysBusinessserverarealinkRepository from '/@/views/pages/sys/businessserverarealink/useSysBusinessserverarealinkRepository' // 模板修改标记
import useSysServerareaRepository from '/@/views/pages/sys/serverarea/useSysServerareaRepository' // 模板修改标记
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'SysBusinessBind', // 模板修改标记
  mixins: [formMixin],
  components: {},
  setup(props, { emit }) {
    const { t } = useI18n()
    const { formData, getSysBusinessByIdHandle } = useSysBusinessRepository() // 模板修改标记
    const { createSysBusinessserverarealinkHandle } = useSysBusinessserverarealinkRepository() // 模板修改标记
    const { sysServerareaSelect, getSysServerareaSelectHandle } = useSysServerareaRepository()

    getSysServerareaSelectHandle({ businessId: props.pageParams.id })
    getSysBusinessByIdHandle(props.pageParams)

    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)

    const rules = {
      serverAreaIdList: [{ required: true, message: t('SysBusiness.serverAreaIdListPlaceHolder'), trigger: 'blur' }] // 模板修改标记
    }
    // 提交逻辑
    function submitHandle() {
      const cMethod = createSysBusinessserverarealinkHandle // 模板修改标记
      const cFormData = unref(formData)
      cFormData.businessId = cFormData.id
      formPageSubmitHandle(cMethod, cFormData, () => {
        emit('update-table')
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
      sysServerareaSelect
    }
  }
})
</script>
