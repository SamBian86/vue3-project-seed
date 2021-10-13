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
        <el-form-item :label="$t('SysFunctioninfo.title')" prop="title">
          <el-input v-model="formData.title" :placeholder="$t('SysFunctioninfo.titlePlaceHolder')" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('SysFunctioninfo.appVersion')" prop="appVersion">
          <el-input v-model="formData.appVersion" :placeholder="$t('SysFunctioninfo.appVersionPlaceHolder')" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('SysFunctioninfo.type')" prop="type">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.type"
            :placeholder="$t('SysFunctioninfo.typePlaceHolder')"
            clearable
          >
            <el-option
              v-for="item in getDictByType('appMenu')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SysFunctioninfo.icon')" prop="icon">
          <UploadFile
            ref="uploadFile1"
            :type="'one'"
            :items="icons"
            :style-text="'width: 50px; height: 50px'"
            :disabled="pageType === 'detail'"
            @success-callback="uploadIconSuccessHandle"
          ></UploadFile>
        </el-form-item>
        <el-form-item :label="$t('SysFunctioninfo.elderlyIcon')" prop="elderlyIcon">
          <UploadFile
            ref="uploadFile2"
            :type="'one'"
            :items="elderlyIcons"
            :style-text="'width: 50px; height: 50px'"
            :disabled="pageType === 'detail'"
            @success-callback="uploadElderlyIconSuccessHandle"
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
import { defineComponent, ref, watch, unref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { StyleEnum } from '/@/enums/styleEnum'
import { mapGetters } from 'vuex'
// components
import { UploadFile } from '/@/components/UploadFile'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysFunctioninfoRepository from './useSysFunctioninfoRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
export default defineComponent({
  name: 'SysFunctioninfoForm', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const icons = ref([])
    const elderlyIcons = ref([])
    const {
      formData,
      createSysFunctioninfoHandle,
      updateSysFunctioninfoHandle,
      getSysFunctioninfoByIdHandle,
      formPageResetHandle
    } = useSysFunctioninfoRepository() // 模板修改标记
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
          getSysFunctioninfoByIdHandle(params, hideSkeleton).then((response) => {
            const { icon, elderlyIcon } = response
            if (icon) {
              icons.value = [{ url: icon }]
            } else {
              icons.value = []
            }
            if (elderlyIcon) {
              elderlyIcons.value = [{ url: elderlyIcon }]
            } else {
              elderlyIcons.value = []
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
      title: [{ required: true, message: t('SysFunctioninfo.titlePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      appVersion: [{ required: true, message: t('SysFunctioninfo.appVersionPlaceHolder'), trigger: 'blur' }],
      type: [{ required: true, message: t('SysFunctioninfo.typePlaceHolder'), trigger: 'blur' }],
      icon: [{ required: true, message: t('SysFunctioninfo.iconPlaceHolder'), trigger: 'blur' }],
      elderlyIcon: [{ required: true, message: t('SysFunctioninfo.elderlyIconPlaceHolder'), trigger: 'blur' }]
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createSysFunctioninfoHandle : updateSysFunctioninfoHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, cFormData, () => {
        emit('update-table')
        emit('hide-dialog')
        emit('show-skeleton')
      })
    }

    // 上传成功回调
    function uploadIconSuccessHandle(items: any) {
      icons.value = items
      // one
      if (items.length !== 0) {
        formData.value.icon = items[0]['url']
      } else {
        formData.value.icon = ''
      }
      // many
      // if (items.length !== 0) {
      //   formData.value.xxx = items
      // }
    }

    // 上传成功回调
    function uploadElderlyIconSuccessHandle(items: any) {
      elderlyIcons.value = items
      // one
      if (items.length !== 0) {
        formData.value.elderlyIcon = items[0]['url']
      } else {
        formData.value.elderlyIcon = ''
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
      rules,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      icons,
      uploadIconSuccessHandle,
      elderlyIcons,
      uploadElderlyIconSuccessHandle
    }
  }
})
</script>
