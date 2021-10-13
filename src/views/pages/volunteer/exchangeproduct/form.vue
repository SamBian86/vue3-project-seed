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
        <el-form-item :label="$t('VolunteerExchangeproduct.name')" prop="name">
          <el-input v-model="formData.name" :placeholder="$t('VolunteerExchangeproduct.namePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('VolunteerExchangeproduct.credit')" prop="credit">
          <el-input
            v-model="formData.credit"
            :placeholder="$t('VolunteerExchangeproduct.creditPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('VolunteerExchangeproduct.stockQuantity')" prop="stockQuantity">
          <el-input
            v-model="formData.stockQuantity"
            :placeholder="$t('VolunteerExchangeproduct.stockQuantityPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('VolunteerExchangeproduct.details')" prop="details">
          <Tinymce
            ref="tinymce"
            :data="formData.details"
            :height="'400'"
            :placeholder="$t('VolunteerExchangeproduct.detailsPlaceHolder')"
            @content-change-handle="contentChangeHandle"
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('VolunteerExchangeproduct.photo')" prop="photo">
          <UploadFile
            ref="uploadFile"
            :type="'one'"
            :items="images"
            :style-text="'width: 300px;'"
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
import { Tinymce } from '/@/components/Tinymce'
import { UploadFile } from '/@/components/UploadFile'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useVolunteerExchangeproductRepository from './useVolunteerExchangeproductRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'VolunteerExchangeproductForm', // 模板修改标记
  mixins: [formMixin],
  components: { Tinymce, UploadFile },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const images = ref([])
    const details = ref('')
    const pageType = ref(props.pageType)
    const {
      formData,
      createVolunteerExchangeproductHandle,
      updateVolunteerExchangeproductHandle,
      getVolunteerExchangeproductByIdHandle,
      formPageResetHandle
    } = useVolunteerExchangeproductRepository() // 模板修改标记
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
          getVolunteerExchangeproductByIdHandle(params, hideSkeleton).then((response) => {
            const { photo } = response
            if (photo) {
              images.value = [{ url: photo }]
            } else {
              images.value = []
            }
            details.value = response.details
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
      name: [{ required: true, message: t('VolunteerExchangeproduct.namePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      credit: [{ required: true, message: t('VolunteerExchangeproduct.creditPlaceHolder'), trigger: 'blur' }],
      stockQuantity: [{ required: true, message: t('VolunteerExchangeproduct.stockQuantityPlaceHolder'), trigger: 'blur' }],
      details: [{ required: true, message: t('VolunteerExchangeproduct.detailsPlaceHolder'), trigger: 'blur' }],
      photo: [{ required: true, message: t('VolunteerExchangeproduct.photoPlaceHolder'), trigger: 'change' }]
    }

    function contentChangeHandle(value: any) {
      details.value = value
      formData.value.details = value
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

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createVolunteerExchangeproductHandle : updateVolunteerExchangeproductHandle // 模板修改标记
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
      contentChangeHandle,
      uploadSuccessHandle,
      details
    }
  }
})
</script>
