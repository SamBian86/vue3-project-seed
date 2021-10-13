<template>
  <el-form ref="ruleForm" :model="formData" :rules="rules" :size="StyleEnum.FORM_SIZE" :label-width="150">
    <el-form-item :label="$t('OssFile.type')" prop="type">
      <el-radio-group v-model="formData.type">
        <el-radio v-for="item in typeRadioItems" :label="item.label">
          {{ item.name }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <div v-if="formData.type === 1">
      <el-form-item :label="$t('OssFile.qiniuDomain')" prop="qiniuDomain">
        <el-input v-model="formData.qiniuDomain" :placeholder="$t('OssFile.qiniuDomainPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.qiniuPrefix')" prop="qiniuPrefix">
        <el-input v-model="formData.qiniuPrefix" :placeholder="$t('OssFile.qiniuPrefixPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.qiniuAccessKey')" prop="qiniuAccessKey">
        <el-input v-model="formData.qiniuAccessKey" :placeholder="$t('OssFile.qiniuAccessKeyPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.qiniuSecretKey')" prop="qiniuSecretKey">
        <el-input v-model="formData.qiniuSecretKey" :placeholder="$t('OssFile.qiniuSecretKeyPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.qiniuBucketName')" prop="qiniuBucketName">
        <el-input v-model="formData.qiniuBucketName" :placeholder="$t('OssFile.qiniuBucketNamePlaceHolder')" clearable></el-input>
      </el-form-item>
    </div>
    <div v-if="formData.type === 2">
      <el-form-item :label="$t('OssFile.aliyunDomain')" prop="aliyunDomain">
        <el-input v-model="formData.aliyunDomain" :placeholder="$t('OssFile.aliyunDomainPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.aliyunPrefix')" prop="aliyunPrefix">
        <el-input v-model="formData.aliyunPrefix" :placeholder="$t('OssFile.aliyunPrefixPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.aliyunEndPoint')" prop="aliyunEndPoint">
        <el-input v-model="formData.aliyunEndPoint" :placeholder="$t('OssFile.aliyunEndPointPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.aliyunAccessKeyId')" prop="aliyunAccessKeyId">
        <el-input
          v-model="formData.aliyunAccessKeyId"
          :placeholder="$t('OssFile.aliyunAccessKeyIdPlaceHolder')"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.aliyunAccessKeySecret')" prop="aliyunAccessKeySecret">
        <el-input
          v-model="formData.aliyunAccessKeySecret"
          :placeholder="$t('OssFile.aliyunAccessKeySecretPlaceHolder')"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.aliyunBucketName')" prop="aliyunBucketName">
        <el-input
          v-model="formData.aliyunBucketName"
          :placeholder="$t('OssFile.aliyunBucketNamePlaceHolder')"
          clearable
        ></el-input>
      </el-form-item>
    </div>
    <div v-if="formData.type === 3">
      <el-form-item :label="$t('OssFile.qcloudDomain')" prop="qcloudDomain">
        <el-input v-model="formData.qcloudDomain" :placeholder="$t('OssFile.qcloudDomainPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.qcloudPrefix')" prop="qcloudPrefix">
        <el-input v-model="formData.qcloudPrefix" :placeholder="$t('OssFile.qcloudPrefixPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.qcloudAppId')" prop="qcloudAppId">
        <el-input v-model="formData.qcloudAppId" :placeholder="$t('OssFile.qcloudAppIdPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.qcloudSecretId')" prop="qcloudSecretId">
        <el-input v-model="formData.qcloudSecretId" :placeholder="$t('OssFile.qcloudSecretIdPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.qcloudSecretKey')" prop="qcloudSecretKey">
        <el-input v-model="formData.qcloudSecretKey" :placeholder="$t('OssFile.qcloudSecretKeyPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.qcloudBucketName')" prop="qcloudBucketName">
        <el-input v-model="formData.bbb" :placeholder="$t('OssFile.qcloudBucketNamePlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.qcloudRegion')" prop="qcloudRegion">
        <el-select
          class="el-select-block"
          :size="StyleEnum.FORM_SIZE"
          v-model="formData.qcloudRegion"
          :placeholder="$t('OssFile.qcloudRegionPlaceHolder')"
          clearable
        >
          <el-option
            v-for="item in qcloudRegionSelectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </div>
    <div v-if="formData.type === 4">
      <el-form-item :label="$t('OssFile.fastdfsDomain')" prop="fastdfsDomain">
        <el-input v-model="formData.fastdfsDomain" :placeholder="$t('OssFile.fastdfsDomainPlaceHolder')" clearable></el-input>
      </el-form-item>
    </div>
    <div v-if="formData.type === 5">
      <el-form-item :label="$t('OssFile.localDomain')" prop="localDomain">
        <el-input v-model="formData.localDomain" :placeholder="$t('OssFile.localDomainPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.localPrefix')" prop="localPrefix">
        <el-input v-model="formData.localPrefix" :placeholder="$t('OssFile.localPrefixPlaceHolder')" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('OssFile.localPath')" prop="localPath">
        <el-input v-model="formData.localPath" :placeholder="$t('OssFile.localPathPlaceHolder')" clearable></el-input>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
        {{ $t('form.submit') }}
      </el-button>
    </el-form-item>
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
import useOssFileRepository from './useOssFileRepository' // 模板修改标记
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'OssFileConfig', // 模板修改标记
  mixins: [formMixin],
  components: {},
  setup(props, { emit }) {
    const { t } = useI18n()
    const rules = ref({})
    const { formData, createOssFileHandle, getOssFileInfoHandle } = useOssFileRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle, clearValidate } = useFormPageComponent(ruleForm)
    getOssFileInfoHandle()

    // 以下是页面逻辑---------------------------------------------------------------

    const typeRadioItems = ref([
      { name: t('OssFile.type1'), label: 1 },
      { name: t('OssFile.type2'), label: 2 },
      { name: t('OssFile.type3'), label: 3 },
      { name: t('OssFile.type4'), label: 4 },
      { name: t('OssFile.type5'), label: 5 }
    ])

    const qcloudRegionSelectOptions = ref([
      { label: 'OssFile.region.qcloudRegionBeijing1', value: 'ap-beijing-1' },
      { label: 'OssFile.region.qcloudRegionBeijing', value: 'ap-beijing' },
      { label: 'OssFile.region.qcloudRegionShanghai', value: 'ap-shanghai' },
      { label: 'OssFile.region.qcloudRegionGuangzhou', value: 'ap-guangzhou' },
      { label: 'OssFile.region.qcloudRegionChengdu', value: 'ap-chengdu' },
      { label: 'OssFile.region.qcloudRegionChongqing', value: 'ap-chongqing' },
      { label: 'OssFile.region.qcloudRegionSingapore', value: 'ap-singapore' },
      { label: 'OssFile.region.qcloudRegionHongkong', value: 'ap-hongkong' },
      { label: 'OssFile.region.qcloudRegionToronto', value: 'na-toronto' },
      { label: 'OssFile.region.qcloudRegionFrankfurt', value: 'eu-frankfurt' }
    ])
    // 默认值
    function defaultConfigHandle() {}

    const allRules = {
      // 七牛 rule
      qiniuDomain: [{ required: true, message: t('OssFile.qiniuDomainPlaceHolder'), trigger: 'blur' }],
      qiniuAccessKey: [{ required: true, message: t('OssFile.qiniuAccessKeyPlaceHolder'), trigger: 'blur' }],
      qiniuSecretKey: [{ required: true, message: t('OssFile.qiniuSecretKeyPlaceHolder'), trigger: 'blur' }],
      qiniuBucketName: [{ required: true, message: t('OssFile.qiniuBucketNamePlaceHolder'), trigger: 'blur' }],
      // 阿里云 rule
      aliyunDomain: [{ required: true, message: t('OssFile.aliyunDomainPlaceHolder'), trigger: 'blur' }],
      aliyunEndPoint: [{ required: true, message: t('OssFile.aliyunEndPointPlaceHolder'), trigger: 'blur' }],
      aliyunAccessKeyId: [{ required: true, message: t('OssFile.aliyunAccessKeyIdPlaceHolder'), trigger: 'blur' }],
      aliyunAccessKeySecret: [{ required: true, message: t('OssFile.aliyunAccessKeySecretPlaceHolder'), trigger: 'blur' }],
      aliyunBucketName: [{ required: true, message: t('OssFile.aliyunBucketNamePlaceHolder'), trigger: 'blur' }],
      // 腾讯 rule
      qcloudDomain: [{ required: true, message: t('OssFile.qcloudDomainPlaceHolder'), trigger: 'blur' }],
      qcloudAppId: [{ required: true, message: t('OssFile.qcloudAppIdPlaceHolder'), trigger: 'blur' }],
      qcloudSecretId: [{ required: true, message: t('OssFile.qcloudSecretIdPlaceHolder'), trigger: 'blur' }],
      qcloudSecretKey: [{ required: true, message: t('OssFile.qcloudSecretKeyPlaceHolder'), trigger: 'blur' }],
      qcloudBucketName: [{ required: true, message: t('OssFile.qcloudBucketNamePlaceHolder'), trigger: 'blur' }],
      qcloudRegion: [{ required: true, message: t('OssFile.qcloudRegionPlaceHolder'), trigger: 'change' }],
      // FastDFS rule
      fastdfsDomain: [{ required: true, message: t('OssFile.fastdfsDomainPlaceHolder'), trigger: 'blur' }],
      // 本地 rule
      localDomain: [{ required: true, message: t('OssFile.localDomainPlaceHolder'), trigger: 'blur' }],
      localPath: [{ required: true, message: t('OssFile.localPathPlaceHolder'), trigger: 'blur' }]
    }

    // 相关页面基础数据
    // 校验规则
    rules.value = allRules

    // 提交逻辑
    function submitHandle() {
      const cMethod = createOssFileHandle // 模板修改标记
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
      typeRadioItems,
      qcloudRegionSelectOptions,
      // 表单中相关项初始化数据
      submitHandle
    }
  }
})
</script>
