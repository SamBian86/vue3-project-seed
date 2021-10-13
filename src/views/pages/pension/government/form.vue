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
        <el-form-item :label="$t('PensionGovernment.governmentPhoto')" prop="governmentPhoto">
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
        <el-form-item :label="$t('PensionGovernment.governmentTitle')" prop="governmentTitle">
          <el-input
            v-model="formData.governmentTitle"
            :placeholder="$t('PensionGovernment.governmentTitlePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionGovernment.governmentType')" prop="governmentType">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.governmentType"
            :placeholder="$t('PensionGovernment.governmentTypePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('governmentType')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionGovernment.governmentKeyword')" prop="governmentKeyword">
          <el-input
            v-model="formData.governmentKeyword"
            :placeholder="$t('PensionGovernment.governmentKeywordPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionGovernment.governmentEditor')" prop="governmentEditor">
          <el-input
            v-model="formData.governmentEditor"
            :placeholder="$t('PensionGovernment.governmentEditorPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionGovernment.governmentRemarks')" prop="governmentRemarks">
          <el-input
            type="textarea"
            :rows="5"
            v-model="formData.governmentRemarks"
            :placeholder="$t('PensionGovernment.governmentRemarksPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionGovernment.governmentIntroduce')" prop="governmentIntroduce">
          <el-input
            type="textarea"
            :rows="5"
            v-model="formData.governmentIntroduce"
            :placeholder="$t('PensionGovernment.governmentIntroducePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionGovernment.governmentContent')" prop="governmentContent">
          <Tinymce
            ref="tinymce"
            :data="formData.governmentContent"
            :height="'400'"
            :placeholder="$t('PensionGovernment.governmentContentPlaceHolder')"
            @content-change-handle="contentChangeHandle"
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
import { UploadFile } from '/@/components/UploadFile'
import { Tinymce } from '/@/components/Tinymce'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import usePensionGovernmentRepository from './usePensionGovernmentRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionGovernmentForm', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile, Tinymce },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const images = ref([])
    const governmentContent = ref('')
    const pageType = ref(props.pageType)
    const {
      formData,
      createPensionGovernmentHandle,
      updatePensionGovernmentHandle,
      getPensionGovernmentByIdHandle,
      formPageResetHandle
    } = usePensionGovernmentRepository() // 模板修改标记
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
          getPensionGovernmentByIdHandle(params, hideSkeleton).then((response: any) => {
            const { governmentPhoto } = response
            if (governmentPhoto) {
              images.value = [{ url: governmentPhoto }]
            } else {
              images.value = []
            }
            governmentContent.value = response.governmentContent
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
      governmentType: [{ required: true, message: t('PensionGovernment.governmentTypePlaceHolder'), trigger: 'change' }], // 模板修改标记
      governmentKeyword: [{ required: true, message: t('PensionGovernment.governmentKeywordPlaceHolder'), trigger: 'blur' }], // 模板修改标记
      governmentTitle: [{ required: true, message: t('PensionGovernment.governmentTitlePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      governmentEditor: [{ required: true, message: t('PensionGovernment.governmentEditorPlaceHolder'), trigger: 'blur' }], // 模板修改标记
      governmentContent: [{ required: true, message: t('PensionGovernment.governmentContentPlaceHolder'), trigger: 'blur' }], // 模板修改标记
      governmentIntroduce: [{ required: true, message: t('PensionGovernment.governmentIntroducePlaceHolder'), trigger: 'blur' }] // 模板修改标记
    }

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      images.value = items
      // one
      if (items.length !== 0) {
        formData.value.governmentPhoto = items[0]['url']
      } else {
        formData.value.governmentPhoto = ''
      }
      // many
      // if (items.length !== 0) {
      //   formData.value.bbb = items
      // }
    }

    function contentChangeHandle(value: any) {
      governmentContent.value = value
      formData.value.governmentContent = value
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createPensionGovernmentHandle : updatePensionGovernmentHandle // 模板修改标记
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
      governmentContent,
      uploadSuccessHandle,
      contentChangeHandle
    }
  }
})
</script>
