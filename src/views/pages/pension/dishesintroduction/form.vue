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
        <el-form-item :label="$t('PensionDishesintroduction.photo')" prop="photo">
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
        <el-form-item :label="$t('PensionDishesintroduction.name')" prop="name">
          <el-input v-model="formData.name" :placeholder="$t('PensionDishesintroduction.namePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionDishesintroduction.linkman')" prop="linkman">
          <el-input
            v-model="formData.linkman"
            :placeholder="$t('PensionDishesintroduction.linkmanPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionDishesintroduction.linktelephone')" prop="linktelephone">
          <el-input
            v-model="formData.linktelephone"
            :placeholder="$t('PensionDishesintroduction.linktelephonePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionDishesintroduction.paddress')" prop="paddress">
          <CascaderItem
            ref="cascaderItem"
            :show-text="formData.paddress"
            :data-method="getSysAddressHandle"
            :lazy="true"
            :disabled="pageType === 'detail'"
            :placeholder="$t('PensionDishesintroduction.paddressPlaceHolder')"
            @cascader-change-handle="cascaderChangeHandle"
          ></CascaderItem>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionDishesintroduction.address')" prop="address">
          <AMapAddress
            :show-text="formData.address"
            :lng="formData.lng"
            :lat="formData.lat"
            :style-text="'height: 300px'"
            :placeholder="$t('PensionDishesintroduction.addressPlaceHolder')"
            :page-type="pageType"
            :auto-complete-open="true"
            @address-change-handle="addressChangeHandle"
          />
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
import { CascaderItem } from '/@/components/CascaderItem'
import { UploadFile } from '/@/components/UploadFile'
import { AMapAddress } from '/@/components/AMapAddress'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import usePensionDishesintroductionRepository from './usePensionDishesintroductionRepository' // 模板修改标记
import useSysAddressRepository from '/@/views/pages/sys/address/useSysAddressRepository'
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionDishesintroductionForm', // 模板修改标记
  mixins: [formMixin],
  components: { CascaderItem, UploadFile, AMapAddress },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const images = ref([])
    const pageType = ref(props.pageType)
    const {
      formData,
      createPensionDishesintroductionHandle,
      updatePensionDishesintroductionHandle,
      getPensionDishesintroductionByIdHandle,
      formPageResetHandle
    } = usePensionDishesintroductionRepository() // 模板修改标记
    const { getSysAddressHandle } = useSysAddressRepository()
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
          getPensionDishesintroductionByIdHandle(params, hideSkeleton).then((response: any) => {
            const { photo, provinceName, cityName, areaName, streetName } = response
            if (photo) {
              images.value = [{ url: photo }]
            } else {
              images.value = []
            }

            // 需要在获取数据那里处理paddress
            if (provinceName && cityName && areaName && streetName) {
              formData.value['paddress'] = `${provinceName} / ${cityName} / ${areaName} / ${streetName}`
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

    // 校验 photo name linkman linktelephone paddress address
    const rules = {
      photo: [{ required: true, message: t('PensionDishesintroduction.photoPlaceHolder'), trigger: 'change' }], // 模板修改标记
      name: [{ required: true, message: t('PensionDishesintroduction.namePlaceHolder'), trigger: 'blur' }],
      linkman: [{ required: true, message: t('PensionDishesintroduction.linkmanPlaceHolder'), trigger: 'blur' }],
      linktelephone: [
        {
          required: true,
          message: t('PensionDishesintroduction.linktelephonePlaceHolder'),
          trigger: 'blur',
          validator: (rule: any, value: any, callback: any) => {
            validatePhoneHandle(rule, value, callback, t)
          }
        }
      ],

      paddress: [{ required: true, message: t('PensionDishesintroduction.paddressPlaceHolder'), trigger: 'change' }],
      address: [{ required: true, message: t('PensionDishesintroduction.addressPlaceHolder'), trigger: 'change' }]
    }

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      images.value = items
      // one
      if (items.length !== 0) {
        formData.value.photo = items[0]['url']
      } else {
        formData.value.photo = ''
      }
      // many
      // if (items.length !== 0) {
      //   formData.value.bbb = items
      // }
    }

    // 行政区块回调处理
    function cascaderChangeHandle(data: { selected: any[]; store: Object }) {
      const { selected, store } = data
      if (selected.length === 4) {
        formData.value['provinceCode'] = selected[0]
        formData.value['cityCode'] = selected[1]
        formData.value['areaCode'] = selected[2]
        formData.value['streetCode'] = selected[3]
        formData.value['paddress'] = `${getValue(selected[0])} / ${getValue(selected[1])} / ${getValue(selected[2])} / ${getValue(
          selected[3]
        )}`
      }

      function getValue(key: any) {
        return store[key] ? store[key] : ''
      }
    }

    // 地址变动事件
    function addressChangeHandle(data: { address: any; lng: any; lat: any }) {
      const { address, lng, lat } = data
      formData.value['address'] = address
      formData.value['lng'] = lng
      formData.value['lat'] = lat
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createPensionDishesintroductionHandle : updatePensionDishesintroductionHandle // 模板修改标记
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
      uploadSuccessHandle,
      cascaderChangeHandle,
      getSysAddressHandle,
      addressChangeHandle
    }
  }
})
</script>
