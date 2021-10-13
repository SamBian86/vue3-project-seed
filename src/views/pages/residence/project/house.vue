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
        <el-form-item :label="$t('ResidenceProject.apartmentName')" prop="apartmentName">
          <el-input
            v-model="formData.apartmentName"
            :placeholder="$t('ResidenceProject.apartmentNamePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('ResidenceProject.projectApartmentDetail')" prop="projectApartmentDetail">
          <el-input
            v-model="formData.projectApartmentDetail"
            :placeholder="$t('ResidenceProject.projectApartmentDetailPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('ResidenceProject.url')" prop="url">
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
import { UploadFile } from '/@/components/UploadFile'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useResidenceProjectRepository from './useResidenceProjectRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'ResidenceProjectHouse', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const images = ref([])
    const pageType = ref(props.pageType)
    const { formData } = useResidenceProjectRepository() // 模板修改标记
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)

    if (props.pageParams.url) {
      images.value = [{ url: props.pageParams.url }]
    } else {
      images.value = []
    }
    formData.value = props.pageParams
    pageType.value = props.pageType

    // 以下是页面逻辑---------------------------------------------------------------

    // 相关页面基础数据
    // 模板修改标记

    // 校验
    const rules = {
      apartmentName: [{ required: true, message: t('ResidenceProject.apartmentNamePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      projectApartmentDetail: [
        { required: true, message: t('ResidenceProject.projectApartmentDetailPlaceHolder'), trigger: 'blur' }
      ],
      url: [{ required: true, message: t('ResidenceProject.urlPlaceHolder'), trigger: 'change' }]
    }

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      images.value = items
      // one
      if (items.length !== 0) {
        formData.value.url = items[0]['url']
        formData.value.ossId = items[0]['id']
      } else {
        formData.value.url = ''
        formData.value.ossId = ''
      }
      // many
      // if (items.length !== 0) {
      //   formData.value.bbb = items
      // }
    }

    // 提交逻辑
    function submitHandle() {
      const cFormData = unref(formData)
      formPageSubmitHandle(null, {}, () => {
        emit('hide-dialog')
        emit('update-form', pageType.value, cFormData)
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
      uploadSuccessHandle
    }
  }
})
</script>
