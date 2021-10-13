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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionServerHot.businessId')" prop="businessId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.businessId"
            :placeholder="$t('PensionServerHot.businessIdPlaceHolder')"
            @change="businessChangeHandle"
            filterable
            clearable
          >
            <el-option v-for="item in sysBusinessListPull" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionServerHot.serverId')" prop="serverId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.serverId"
            :placeholder="$t('PensionServerHot.serverIdPlaceHolder')"
            @change="businessChangeHandle"
            filterable
            clearable
          >
            <el-option
              v-for="item in pensionServerListPull"
              :key="item.serverId"
              :label="item.serverName"
              :value="item.serverId"
            ></el-option>
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
import usePensionServerHotRepository from './usePensionServerHotRepository' // 模板修改标记
import useSysBusinessRepository from '/@/views/pages/sys/business/useSysBusinessRepository' // 模板修改标记
import usePensionServerRepository from '/@/views/pages/pension/server/usePensionServerRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionServerHotForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createPensionServerHotHandle, updatePensionServerHotHandle, formPageResetHandle } =
      usePensionServerHotRepository() // 模板修改标记
    const { sysBusinessListPull, getSysBusinessListPullHandle } = useSysBusinessRepository()
    getSysBusinessListPullHandle()

    const { pensionServerListPull, getPensionServerListPullByIdHandle } = usePensionServerRepository()
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
          // getPensionServerHotByIdHandle(params, hideSkeleton) // 模板修改标记
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
      businessId: [{ required: true, message: t('PensionServerHot.businessIdPlaceHolder'), trigger: 'change' }], // 模板修改标记
      serverId: [{ required: true, message: t('PensionServerHot.serverIdPlaceHolder'), trigger: 'change' }]
    }

    function businessChangeHandle(value: any) {
      if (value) {
        getPensionServerListPullByIdHandle({ id: value })
      } else {
        pensionServerListPull.value = []
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createPensionServerHotHandle : updatePensionServerHotHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, { ...cFormData, id: cFormData.serverId }, () => {
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
      sysBusinessListPull,
      pensionServerListPull,
      businessChangeHandle
    }
  }
})
</script>
