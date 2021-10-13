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
      <el-divider content-position="left">{{ $t('PensionOrder.orderInfo') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.orderNo')" prop="orderNo">
          <el-input v-model="formData.orderNo" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.orderTime')" prop="orderTime">
          <el-input v-model="formData.orderTime" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.orderTypeName')" prop="orderTypeName">
          <el-input v-model="formData.orderTypeName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.orderStatusName')" prop="orderStatusName">
          <el-input v-model="formData.orderStatusName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.serverSku')" prop="serverSku">
          <el-input v-model="formData.serverSku" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.scalePrice')" prop="scalePrice">
          <el-input v-model="formData.scalePrice" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.orderUnitNum')" prop="orderUnitNum">
          <el-input v-model="formData.orderUnitNum" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.payTypeName')" prop="payTypeName">
          <el-input v-model="formData.payTypeName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.price')" prop="price">
          <el-input v-model="formData.price" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.orderDiscount')" prop="orderDiscount">
          <el-input v-model="formData.orderDiscount" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('PensionOrder.realPrice')" prop="realPrice">
          <el-input v-model="formData.realPrice" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.orderUserName')" prop="orderUserName">
          <el-input v-model="formData.orderUserName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.orderUserPhoneNumber')" prop="orderUserPhoneNumber">
          <el-input v-model="formData.orderUserPhoneNumber" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.userName')" prop="userName">
          <el-input v-model="formData.userName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.userPhoneNumber')" prop="userPhoneNumber">
          <el-input v-model="formData.userPhoneNumber" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.orderServerTime')" prop="orderServerTime">
          <el-input v-model="formData.orderServerTime" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="18" :lg="18" :xl="18">
        <el-form-item :label="$t('PensionOrder.address')" prop="address">
          <el-input v-model="formData.address" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOrder.orderRemark')" prop="orderRemark">
          <el-input v-model="formData.orderRemark" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.staffName')" prop="staffName">
          <el-input v-model="formData.staffName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.orderEvaluate')" prop="orderEvaluate">
          <el-input v-model="formData.orderEvaluate" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.serverStartTime')" prop="serverStartTime">
          <el-input v-model="formData.serverStartTime" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.serverEndTime')" prop="serverEndTime">
          <el-input v-model="formData.serverEndTime" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-divider content-position="left">{{ $t('PensionOrder.serverInfo') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.name')" prop="name">
          <el-input v-model="formData.name" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.businessName')" prop="businessName">
          <el-input v-model="formData.businessName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.serverCategoryName')" prop="serverCategoryName">
          <el-input v-model="formData.serverCategoryName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('PensionOrder.serverTypeName')" prop="serverTypeName">
          <el-input v-model="formData.serverTypeName" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
      <!-- <el-form-item v-if="pageType === 'create' || pageType === 'update'">
        <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
          {{ $t('form.submit') }}
        </el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="text"
          @click="openHandle('detail', { id: formData.serverId })"
          :disabled="false"
          :size="StyleEnum.BUTTON_SIZE"
        >
          {{ $t('PensionOrder.detail') }}>>
        </el-button>
      </el-form-item>
    </el-col>
  </el-row>
  <DialogPage ref="dialogPage">
    <template #body>
      <PensionEmployeeDispatch
        ref="formPage"
        :page-type="formPageType"
        :page-params="formPageParams"
        @show-skeleton="showSkeleton"
        @hide-skeleton="hideSkeleton"
        @hide-dialog="hideDialog"
        @update-table="pgTableQuery(tableParams)"
      />
    </template>
    <template #title>
      {{ $t('PensionOrder.detail') }}
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
import usePensionOrderRepository from './usePensionOrderRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// 表单页面
import PensionEmployeeDispatch from './detail.vue'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionOrderForm', // 模板修改标记
  mixins: [formMixin],
  components: { DialogPage, PensionEmployeeDispatch },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createPensionOrderHandle, updatePensionOrderHandle, getPensionOrderByIdHandle, formPageResetHandle } =
      usePensionOrderRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageType, formPageParams, formPageSubmitHandle, formPageDetailHandle } = useFormPageComponent(ruleForm)
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

    // dialogPage相关代码开始
    const dialogPage = ref(null)
    const { showDialog, hideDialog } = useDialogPageComponent(dialogPage)
    function openHandle(type: any, item: any) {
      showDialog()
      setTimeout(() => {
        if (type === 'detail') {
          detailHandle({ ...item, t: new Date().getTime() })
        }
      }, StyleEnum.OPEN_DIALOG_TIME)
    }

    // 详情
    function detailHandle(params: any) {
      hideSkeleton()
      formPageDetailHandle(params)
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
          getPensionOrderByIdHandle(params, hideSkeleton) // 模板修改标记
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

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createPensionOrderHandle : updatePensionOrderHandle // 模板修改标记
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
      showSkeleton,
      hideSkeleton,
      hideDialog,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      dialogPage,
      openHandle,
      formPageType,
      formPageParams
    }
  }
})
</script>
