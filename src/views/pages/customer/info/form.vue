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
      <el-divider content-position="left">{{ $t('CustomerInfo.pageTitle') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.name')" prop="name">
          {{ formData.customerInfo && formData.customerInfo.name }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.sex')" prop="sex">
          {{ formData.customerInfo && formData.customerInfo.sex }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.idCard')" prop="idCard">
          {{ formData.customerInfo && formData.customerInfo.idCard }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.phone')" prop="phone">
          {{ formData.customerInfo && formData.customerInfo.phone }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.birthday')" prop="birthday">
          {{ formData.customerInfo && formData.customerInfo.birthday }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.age')" prop="age">
          {{ formData.customerInfo && formData.customerInfo.age }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.isMarried')" prop="isMarried">
          {{ formData.customerInfo && formData.customerInfo.isMarried }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.nation')" prop="nation">
          {{ formData.customerInfo && formData.customerInfo.nation }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.nativePlace')" prop="nativePlace">
          {{ formData.customerInfo && formData.customerInfo.nativePlace }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.email')" prop="email">
          {{ formData.customerInfo && formData.customerInfo.email }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.contacts')" prop="contacts">
          {{ formData.customerInfo && formData.customerInfo.contacts }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.contactPhone')" prop="contactPhone">
          {{ formData.customerInfo && formData.customerInfo.contactPhone }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.projectName')" prop="projectName">
          {{ formData.customerInfo && formData.customerInfo.projectName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.buildingNumber')" prop="buildingNumber">
          {{ formData.customerInfo && formData.customerInfo.buildingNumber }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.houseCode')" prop="houseCode">
          {{ formData.customerInfo && formData.customerInfo.houseCode }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('CustomerInfo.address')" prop="address">
          {{ formData.customerInfo && formData.customerInfo.address }}
        </el-form-item>
      </el-col>
      <el-divider content-position="left">{{ $t('CustomerInfo.memberInfoTitle') }}</el-divider>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.nickName')" prop="nickName">
          {{ formData.memberInfo && formData.memberInfo.nickName }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.memberIdentity')" prop="memberIdentity">
          {{ formData.memberInfo && formData.memberInfo.memberIdentity }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.cardNumber')" prop="cardNumber">
          {{ formData.memberInfo && formData.memberInfo.cardNumber }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.memberLevel')" prop="memberLevel">
          {{ formData.memberInfo && formData.memberInfo.memberLevel }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.balance')" prop="balance">
          {{ formData.memberInfo && formData.memberInfo.balance }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.integral')" prop="integral">
          {{ formData.memberInfo && formData.memberInfo.integral }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.ltCardNumber')" prop="ltCardNumber">
          {{ formData.memberInfo && formData.memberInfo.ltCardNumber }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.registShop')" prop="registShop">
          {{ formData.memberInfo && formData.memberInfo.registShop }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.memberSource')" prop="memberSource">
          {{ formData.memberInfo && formData.memberInfo.source }}
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('CustomerInfo.registTime')" prop="registTime">
          {{ formData.memberInfo && formData.memberInfo.registTime }}
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
import useCustomerInfoRepository from './useCustomerInfoRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'CustomerInfoForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createCustomerInfoHandle, updateCustomerInfoHandle, getCustomerInfoByIdHandle, formPageResetHandle } =
      useCustomerInfoRepository() // 模板修改标记
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
          getCustomerInfoByIdHandle(params, hideSkeleton) // 模板修改标记
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
      const cMethod = pageType.value === 'create' ? createCustomerInfoHandle : updateCustomerInfoHandle // 模板修改标记
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
      submitHandle
    }
  }
})
</script>
