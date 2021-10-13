<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="150"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysBusiness.type')" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio-button v-for="item in typeItems" :label="item.label">
              {{ item.name }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col v-if="formData.type === 1" :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysBusiness.appId')" prop="appId">
          <el-input v-model="formData.appId" :placeholder="$t('SysBusiness.appIdPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col v-if="formData.type === 1" :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysBusiness.appPrivateKey')" prop="appPrivateKey">
          <el-input
            v-model="formData.appPrivateKey"
            :placeholder="$t('SysBusiness.appPrivateKeyPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col v-if="formData.type === 1" :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysBusiness.appPunlicKey')" prop="appPunlicKey">
          <el-input v-model="formData.appPunlicKey" :placeholder="$t('SysBusiness.appPunlicKeyPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col v-if="formData.type === 1" :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysBusiness.alipayPunlicKey')" prop="alipayPunlicKey">
          <el-input
            v-model="formData.alipayPunlicKey"
            :placeholder="$t('SysBusiness.alipayPunlicKeyPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col v-if="formData.type === 2" :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysBusiness.wxAppid')" prop="wxAppid">
          <el-input v-model="formData.wxAppid" :placeholder="$t('SysBusiness.wxAppidPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col v-if="formData.type === 2" :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysBusiness.apiKey')" prop="apiKey">
          <el-input v-model="formData.apiKey" :placeholder="$t('SysBusiness.apiKeyPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col v-if="formData.type === 2" :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysBusiness.mchId')" prop="mchId">
          <el-input v-model="formData.mchId" :placeholder="$t('SysBusiness.mchIdPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col v-if="formData.type === 2" :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysBusiness.mchKey')" prop="mchKey">
          <el-input v-model="formData.mchKey" :placeholder="$t('SysBusiness.mchKeyPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col v-if="formData.type === 2" :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysBusiness.certPath')" prop="certPath">
          <el-input v-model="formData.certPath" :placeholder="$t('SysBusiness.certPathPlaceHolder')" clearable></el-input>
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
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'SysBusinessForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  setup(props, { emit }) {
    const { t } = useI18n()
    const { formData, updateSysBusinessHandle, getSysBusinessByIdHandle } = useSysBusinessRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)

    getSysBusinessByIdHandle(props.pageParams, () => {
      defaultConfigHandle()
    })

    // 校验
    const rules = {
      type: [{ required: true, message: t('SysBusiness.typePlaceHolder'), trigger: 'change' }], // 模板修改标记
      appId: [{ required: true, message: t('SysBusiness.appIdPlaceHolder'), trigger: 'blur' }],
      appPrivateKey: [{ required: true, message: t('SysBusiness.appPrivateKeyPlaceHolder'), trigger: 'blur' }],
      appPunlicKey: [{ required: true, message: t('SysBusiness.appPunlicKeyPlaceHolder'), trigger: 'blur' }],
      alipayPunlicKey: [{ required: true, message: t('SysBusiness.alipayPunlicKeyPlaceHolder'), trigger: 'blur' }],
      wxAppid: [{ required: true, message: t('SysBusiness.wxAppidPlaceHolder'), trigger: 'blur' }],
      apiKey: [{ required: true, message: t('SysBusiness.apiKeyPlaceHolder'), trigger: 'blur' }],
      mchId: [{ required: true, message: t('SysBusiness.mchIdPlaceHolder'), trigger: 'blur' }],
      mchKey: [{ required: true, message: t('SysBusiness.mchKeyPlaceHolder'), trigger: 'blur' }],
      certPath: [{ required: true, message: t('SysBusiness.certPathPlaceHolder'), trigger: 'blur' }]
    }

    const typeItems = ref([
      { name: '支付宝', label: 1 },
      { name: '微信', label: 2 }
    ])

    function defaultConfigHandle() {
      formData.value.type = 1
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = updateSysBusinessHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, cFormData, () => {
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
      typeItems
    }
  }
})
</script>
