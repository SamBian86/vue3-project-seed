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
        <el-form-item :label="$t('PensionArticle.articlePhoto')" prop="articlePhoto">
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
        <el-form-item :label="$t('PensionArticle.articleKeyword')" prop="articleKeyword">
          <el-input
            v-model="formData.articleKeyword"
            :placeholder="$t('PensionArticle.articleKeywordPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionArticle.articleType')" prop="articleType">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.articleType"
            :placeholder="$t('PensionArticle.articleTypePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('articleType', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionArticle.communityIds')" prop="communityIds">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.communityIds"
            :placeholder="$t('PensionArticle.communityIdsPlaceHolder')"
            multiple
            filterable
            clearable
          >
            <el-option v-for="item in sysCommunityListAll" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionArticle.articleTitle')" prop="articleTitle">
          <el-input
            v-model="formData.articleTitle"
            :placeholder="$t('PensionArticle.articleTitlePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionArticle.articleEditor')" prop="articleEditor">
          <el-input
            v-model="formData.articleEditor"
            :placeholder="$t('PensionArticle.articleEditorPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionArticle.businessId')" prop="businessId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.businessId"
            :placeholder="$t('PensionArticle.businessIdPlaceHolder')"
            filterable
            clearable
          >
            <el-option v-for="item in sysBusinessListAll" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionArticle.articleRemarks')" prop="articleRemarks">
          <el-input
            type="textarea"
            :rows="5"
            v-model="formData.articleRemarks"
            :placeholder="$t('PensionArticle.articleRemarksPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionArticle.articleIntroduce')" prop="articleIntroduce">
          <el-input
            type="textarea"
            :rows="5"
            v-model="formData.articleIntroduce"
            :placeholder="$t('PensionArticle.articleIntroducePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionArticle.articleContent')" prop="articleContent">
          <Tinymce
            ref="tinymce"
            :data="formData.articleContent"
            :height="'400'"
            :placeholder="$t('PensionArticle.articleContentPlaceHolder')"
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
import usePensionArticleRepository from './usePensionArticleRepository' // 模板修改标记
import useSysCommunityRepository from '/@/views/pages/sys/community/useSysCommunityRepository' // 模板修改标记
import useSysBusinessRepository from '/@/views/pages/sys/business/useSysBusinessRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionArticleForm', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile, Tinymce },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const images = ref([])
    const articleContent = ref('')

    const { formData, createPensionArticleHandle, updatePensionArticleHandle, getPensionArticleByIdHandle, formPageResetHandle } =
      usePensionArticleRepository() // 模板修改标记
    const { sysCommunityListAll, getSysCommunityListAllHandle } = useSysCommunityRepository()
    getSysCommunityListAllHandle()
    const { sysBusinessListAll, getSysBusinessListAllHandle } = useSysBusinessRepository()
    getSysBusinessListAllHandle()
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
          getPensionArticleByIdHandle(params, hideSkeleton).then((response: any) => {
            const { articlePhoto } = response
            if (articlePhoto) {
              images.value = [{ url: articlePhoto }]
            } else {
              images.value = []
            }
            articleContent.value = response.articleContent
          })
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
      articleType: [{ required: true, message: t('PensionArticle.articleTypePlaceHolder'), trigger: 'change' }], // 模板修改标记
      businessId: [{ required: true, message: t('PensionArticle.businessIdPlaceHolder'), trigger: 'change' }],
      articleKeyword: [{ required: true, message: t('PensionArticle.articleKeywordPlaceHolder'), trigger: 'blur' }],
      communityIds: [{ required: true, message: t('PensionArticle.communityIdsPlaceHolder'), trigger: 'change' }],
      articleTitle: [{ required: true, message: t('PensionArticle.articleTitlePlaceHolder'), trigger: 'blur' }],
      articleEditor: [{ required: true, message: t('PensionArticle.articleEditorPlaceHolder'), trigger: 'blur' }],
      articleContent: [{ required: true, message: t('PensionArticle.articleContentPlaceHolder'), trigger: 'blur' }],
      articleIntroduce: [{ required: true, message: t('PensionArticle.articleIntroducePlaceHolder'), trigger: 'blur' }]
    }

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      images.value = items
      // one
      if (items.length !== 0) {
        formData.value.articlePhoto = items[0]['url']
      } else {
        formData.value.articlePhoto = ''
      }
      // many
      // if (items.length !== 0) {
      //   formData.value.bbb = items
      // }
    } // 模板修改标记

    function contentChangeHandle(value: any) {
      articleContent.value = value
      formData.value.articleContent = value
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createPensionArticleHandle : updatePensionArticleHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, { ...cFormData, articleContent: unref(articleContent) }, () => {
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
      sysCommunityListAll,
      sysBusinessListAll,
      contentChangeHandle,
      articleContent
    }
  }
})
</script>
