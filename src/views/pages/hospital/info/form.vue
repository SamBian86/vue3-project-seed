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
        <el-form-item :label="$t('HospitalInfo.name')" prop="name">
          <el-input v-model="formData.name" :placeholder="$t('HospitalInfo.namePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalInfo.phoneNumber')" prop="phoneNumber">
          <el-input v-model="formData.phoneNumber" :placeholder="$t('HospitalInfo.phoneNumberPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalInfo.address')" prop="address">
          <AMapAddress
            :show-text="formData.address"
            :lng="formData.lng"
            :lat="formData.lat"
            :style-text="'height: 300px'"
            :placeholder="$t('HospitalInfo.addressPlaceHolder')"
            :page-type="pageType"
            :auto-complete-open="true"
            @address-change-handle="addressChangeHandle"
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalInfo.type')" prop="type">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.type"
            :placeholder="$t('HospitalInfo.typePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('hospitalType', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24" v-if="formData.type === 1">
        <el-form-item :label="$t('HospitalInfo.orgId')" prop="orgId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.orgId"
            :placeholder="$t('HospitalInfo.orgIdPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('orgId', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24" v-if="formData.type === 2">
        <el-form-item :label="$t('HospitalInfo.url')" prop="url">
          <el-input v-model="formData.url" :placeholder="$t('HospitalInfo.urlPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('HospitalInfo.icon')" prop="icon">
          <UploadFile
            ref="uploadFile"
            :type="'one'"
            :items="images"
            :style-text="'width: 300px'"
            :disabled="pageType === 'detail'"
            @success-callback="uploadSuccessHandle"
          ></UploadFile>
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
import { AMapAddress } from '/@/components/AMapAddress'
import { UploadFile } from '/@/components/UploadFile'

// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useHospitalInfoRepository from './useHospitalInfoRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'HospitalInfoForm', // 模板修改标记
  mixins: [formMixin],
  components: { AMapAddress, UploadFile },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const images = ref([])
    const pageType = ref(props.pageType)
    const { formData, createHospitalInfoHandle, updateHospitalInfoHandle, getHospitalInfoByIdHandle, formPageResetHandle } =
      useHospitalInfoRepository() // 模板修改标记
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
          getHospitalInfoByIdHandle(params, hideSkeleton).then((response: any) => {
            const { icon } = response
            if (icon) {
              images.value = [{ url: icon }]
            } else {
              images.value = []
            }
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
      name: [{ required: true, message: t('HospitalInfo.namePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      phoneNumber: [{ required: true, message: t('HospitalInfo.phoneNumberPlaceHolder'), trigger: 'blur' }],
      address: [{ required: true, message: t('HospitalInfo.addressPlaceHolder'), trigger: 'blur' }],
      type: [{ required: true, message: t('HospitalInfo.typePlaceHolder'), trigger: 'change' }],
      orgId: [{ required: true, message: t('HospitalInfo.orgIdPlaceHolder'), trigger: 'change' }],
      url: [{ required: true, message: t('HospitalInfo.urlPlaceHolder'), trigger: 'blur' }],
      icon: [{ required: true, message: t('HospitalInfo.iconPlaceHolder'), trigger: 'change' }]
    }

    // 地址变动事件
    function addressChangeHandle(data: { address: any; lng: any; lat: any }) {
      const { address, lng, lat } = data
      formData.value['address'] = address
      formData.value['lng'] = lng
      formData.value['lat'] = lat
    }

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      images.value = items
      // one
      if (items.length !== 0) {
        formData.value.icon = items[0]['url']
      } else {
        formData.value.icon = ''
      }
      // many
      // if (items.length !== 0) {
      //   formData.value.bbb = items
      // }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createHospitalInfoHandle : updateHospitalInfoHandle // 模板修改标记
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
      images,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      addressChangeHandle,
      uploadSuccessHandle
    }
  }
})
</script>
