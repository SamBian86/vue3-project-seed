<template>
  <el-row :gutter="StyleEnum.ROW_GUTTER">
    <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
      <el-form
        ref="ruleForm"
        :model="formData"
        :rules="rules"
        :size="StyleEnum.FORM_SIZE"
        :label-width="StyleEnum.FORM_LABEL_WIDTH"
        :disabled="pageType === 'detail'"
      >
        <el-form-item :label="$t('SysBannerinfo.operationType')" prop="operationType">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.operationType"
            :placeholder="$t('SysBannerinfo.operationTypePlaceHolder')"
            @change="operationTypeChangeHandle"
            clearable
          >
            <el-option
              v-for="item in getDictByType('bannerType')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- Banner内容 视频素材 功能 -->
        <el-form-item :label="operationIdTitle" prop="operationId" v-show="operationShow">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.operationId"
            :placeholder="$t('SysBannerinfo.operationIdPlaceHolder')"
            :disabled="operationDisabled"
            @change="operationIdChangeHandle"
            clearable
          >
            <el-option v-for="item in sysBannerinfoOperation" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 链接地址 -->
        <el-form-item :label="$t('SysBannerinfo.extraParam')" prop="extraParam" v-show="extraParamShow">
          <el-input v-model="formData.extraParam" :placeholder="$t('SysBannerinfo.extraParamPlaceHolder')" clearable></el-input>
        </el-form-item>
        <!-- 标题 -->
        <el-form-item :label="$t('SysBannerinfo.title')" prop="title" v-show="titleShow">
          <el-input v-model="formData.title" :placeholder="$t('SysBannerinfo.titlePlaceHolder')" clearable></el-input>
        </el-form-item>
        <!-- 所属区域 -->
        <el-form-item :label="$t('SysBannerinfo.serverAreaList')" prop="serverAreaList">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.serverAreaList"
            :placeholder="$t('SysBannerinfo.serverAreaListPlaceHolder')"
            multiple
            :disabled="serverAreaListDisabled"
            clearable
          >
            <el-option
              v-for="item in sysBannerinfoOperationServerarea"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SysBannerinfo.url')" prop="url">
          <UploadFile
            ref="uploadFile"
            :type="'one'"
            :items="images"
            :disabled="pageType === 'detail'"
            @success-callback="uploadSuccessHandle"
          ></UploadFile>
        </el-form-item>
        <el-form-item v-if="pageType === 'create' || pageType === 'update'">
          <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
            {{ $t('form.submit') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, watch, unref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { StyleEnum } from '/@/enums/styleEnum'
import { mapGetters } from 'vuex'
// components
import { UploadFile } from '/@/components/UploadFile'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'

// API封装
import useSysBannerinfoRepository from './useSysBannerinfoRepository' // 模板修改标记
import useSysVodRepository from '/@/views/pages/sys/vod/useSysVodRepository' // 模板修改标记
// mixin
import formMixin from '/@/mixins/formMixin'
export default defineComponent({
  name: 'SysBannerinfoForm', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const images = ref([])

    const {
      formData,
      createSysBannerinfoHandle,
      updateSysBannerinfoHandle,
      getSysBannerinfoByIdHandle,
      formPageResetHandle,
      sysBannerinfoOperation,
      getSysBannerinfoOperationHandle,
      sysBannerinfoOperationServerarea,
      getSysBannerinfoOperationServerareaHandle
    } = useSysBannerinfoRepository() // 模板修改标记
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

    const operationIdTitles = [
      t('SysBannerinfo.operationId1'),
      t('SysBannerinfo.operationId2'),
      t('SysBannerinfo.operationId3'),
      t('SysBannerinfo.operationId4'),
      t('SysBannerinfo.operationId1')
    ]
    const operationIdTitle = ref(t('SysBannerinfo.operationId1'))

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
          getSysBannerinfoByIdHandle(params, hideSkeleton).then((response: any) => {
            const { operationType, url } = response
            if (url) {
              images.value = [{ url }]
            } else {
              images.value = []
            }
            operationTypeHandle(operationType)
          }) // 模板修改标记
        }
        pageType.value = type
      })

      watch(
        () => formData.value.operationType,
        (value) => {
          operationIdTitle.value = operationIdTitles[value - 1]
        }
      )
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {}
    const operationShow = ref(true)
    const operationDisabled = ref(true)
    const extraParamShow = ref(false)
    const titleShow = ref(false)
    const serverAreaListDisabled = ref(true)

    // 相关页面基础数据
    // 模板修改标记
    const { getSysVodListHandle } = useSysVodRepository()

    // operationTypeChangeHandle
    function operationTypeChangeHandle(operationType: any) {
      formData.value.operationId = ''
      formData.value.serverAreaList = []
      formData.value.extraParam = ''
      formData.value.title = ''
      operationTypeHandle(operationType)
    }

    function operationTypeHandle(operationType: any) {
      switchRule(operationType)
      switchViewByOperationType(operationType)
      if (operationType === '1' || operationType === '2' || operationType === '4') {
        getSysBannerinfoOperationHandle({ operationType })
      }

      if (operationType === '3') {
        getSysVodListHandle().then((response: any) => {
          sysBannerinfoOperation.value = response
        })
        operationIdChangeHandle('')
      }
      if (operationType === '5') {
        operationIdChangeHandle('')
      }
    }

    // operationIdChangeHandle
    function operationIdChangeHandle(operationId: any) {
      const { operationType } = formData.value
      getSysBannerinfoOperationServerareaHandle({ operationType, operationId }).then((response) => {
        if (operationType === '1' || operationType === '2' || operationType === '4') {
          formData.value.serverAreaList = response
        }
      })
    }

    // switchViewByOperationType
    function switchViewByOperationType(value: any) {
      if (value === '') {
        operationShow.value = true
        operationDisabled.value = true
        extraParamShow.value = false
        titleShow.value = false
        serverAreaListDisabled.value = true
      }
      if (value === '1') {
        operationShow.value = true
        operationDisabled.value = false
        extraParamShow.value = false
        titleShow.value = false
        serverAreaListDisabled.value = true
      }
      if (value === '2') {
        operationShow.value = true
        operationDisabled.value = false
        extraParamShow.value = false
        titleShow.value = false
        serverAreaListDisabled.value = true
      }
      if (value === '3') {
        operationShow.value = true
        operationDisabled.value = false
        extraParamShow.value = false
        titleShow.value = false
        serverAreaListDisabled.value = false
      }
      if (value === '4') {
        operationShow.value = true
        operationDisabled.value = false
        extraParamShow.value = false
        titleShow.value = false
        serverAreaListDisabled.value = true
      }
      if (value === '5') {
        operationShow.value = false
        operationDisabled.value = true
        extraParamShow.value = true
        titleShow.value = true
        serverAreaListDisabled.value = false
      }
    }

    const rules = ref({})
    const rule1 = {
      operationType: [{ required: true, message: t('SysBannerinfo.operationTypePlaceHolder'), trigger: 'blur' }],
      operationId: [{ required: true, message: t('SysBannerinfo.operationId1PlaceHolder'), trigger: 'blur' }],
      url: [{ required: true, message: t('SysBannerinfo.urlPlaceHolder'), trigger: 'blur' }]
    }
    const rule2 = {
      operationType: [{ required: true, message: t('SysBannerinfo.operationTypePlaceHolder'), trigger: 'blur' }],
      operationId: [{ required: true, message: t('SysBannerinfo.operationId2PlaceHolder'), trigger: 'blur' }],
      url: [{ required: true, message: t('SysBannerinfo.urlPlaceHolder'), trigger: 'blur' }]
    }
    const rule3 = {
      operationType: [{ required: true, message: t('SysBannerinfo.operationTypePlaceHolder'), trigger: 'blur' }],
      operationId: [{ required: true, message: t('SysBannerinfo.operationId3PlaceHolder'), trigger: 'blur' }],
      url: [{ required: true, message: t('SysBannerinfo.urlPlaceHolder'), trigger: 'blur' }]
    }
    const rule4 = {
      operationType: [{ required: true, message: t('SysBannerinfo.operationTypePlaceHolder'), trigger: 'blur' }],
      operationId: [{ required: true, message: t('SysBannerinfo.operationId4PlaceHolder'), trigger: 'blur' }],
      url: [{ required: true, message: t('SysBannerinfo.urlPlaceHolder'), trigger: 'blur' }]
    }
    const rule5 = {
      operationType: [{ required: true, message: t('SysBannerinfo.operationTypePlaceHolder'), trigger: 'blur' }],
      extraParam: [{ required: true, message: t('SysBannerinfo.extraParamPlaceHolder'), trigger: 'blur' }],
      url: [{ required: true, message: t('SysBannerinfo.urlPlaceHolder'), trigger: 'blur' }]
    }

    const ruleSelector = {
      rule1,
      rule2,
      rule3,
      rule4,
      rule5
    }

    function switchRule(value: any) {
      if (value !== '') {
        rules.value = ruleSelector[`rule${value}`]
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createSysBannerinfoHandle : updateSysBannerinfoHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, cFormData, () => {
        emit('update-table')
        emit('hide-dialog')
        emit('show-skeleton')
      })
    }

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      images.value = items
      // one
      if (items.length !== 0) {
        formData.value.url = items[0]['url']
      } else {
        formData.value.url = ''
      }
      // many
      // if (items.length !== 0) {
      //   formData.value.xxx = items
      // }
    }

    return {
      // 基础支持
      StyleEnum,
      // 表单数据
      formData,
      pageType,
      images,
      rules,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      operationTypeChangeHandle,
      operationIdChangeHandle,
      sysBannerinfoOperation,
      sysBannerinfoOperationServerarea,
      operationIdTitle,
      operationShow,
      operationDisabled,
      extraParamShow,
      titleShow,
      serverAreaListDisabled,
      uploadSuccessHandle
    }
  }
})
</script>
