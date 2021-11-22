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
        <el-form-item :label="$t('PensionOwnerfeedback.ownerName')" prop="ownerName">
          <el-input
            v-model="formData.ownerName"
            :placeholder="$t('PensionOwnerfeedback.ownerNamePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOwnerfeedback.ownerPhone')" prop="ownerPhone">
          <el-input
            v-model="formData.ownerPhone"
            :placeholder="$t('PensionOwnerfeedback.ownerPhonePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOwnerfeedback.applyTime')" prop="applyTime">
          <el-date-picker
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.applyTime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            type="datetime"
            :disabledDate="disabledDate"
            :placeholder="$t('PensionOwnerfeedback.applyTimePlaceHolder')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOwnerfeedback.applyType')" prop="applyType">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.applyType"
            :placeholder="$t('PensionOwnerfeedback.applyTypePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('applyType')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOwnerfeedback.details')" prop="details">
          <el-input
            type="textarea"
            :rows="10"
            v-model="formData.details"
            :placeholder="$t('PensionOwnerfeedback.detailsPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionOwnerfeedback.ossLinks')" prop="ossLinks">
          <UploadFile
            ref="uploadFile"
            :type="'many'"
            :items="oss"
            :style-text="'width: 200px;'"
            :disabled="pageType === 'detail'"
            :accept-file="'imageAndVideo'"
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
import usePensionOwnerfeedbackRepository from './usePensionOwnerfeedbackRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionOwnerfeedbackForm', // 模板修改标记
  mixins: [formMixin],
  components: { UploadFile },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const oss = ref([])
    const pageType = ref(props.pageType)
    const { formData, createPensionOwnerfeedbackHandle, getPensionOwnerfeedbackByIdHandle, formPageResetHandle } =
      usePensionOwnerfeedbackRepository() // 模板修改标记
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
          getPensionOwnerfeedbackByIdHandle(params, hideSkeleton).then((response: any) => {
            const { ossLinkList } = response
            if (ossLinkList.length !== 0) {
              oss.value = ossLinkList
            } else {
              oss.value = []
            }
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
    const disabledDate = (time: any) => {
      return time.getTime() > new Date().getTime()
    }
    // 校验
    const rules = {
      ownerName: [{ required: true, message: t('PensionOwnerfeedback.ownerNamePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      ownerPhone: [
        {
          required: true,
          message: t('PensionOwnerfeedback.ownerPhonePlaceHolder'),
          trigger: 'blur',
          validator: (rule: any, value: any, callback: any) => {
            validatePhoneHandle(rule, value, callback, t)
          }
        }
      ],
      applyTime: [{ required: true, message: t('PensionOwnerfeedback.applyTimePlaceHolder'), trigger: 'change' }],
      applyType: [{ required: true, message: t('PensionOwnerfeedback.applyTypePlaceHolder'), trigger: 'change' }],
      details: [{ required: true, message: t('PensionOwnerfeedback.detailsPlaceHolder'), trigger: 'blur' }]
    }

    // 上传成功回调
    function uploadSuccessHandle(items: any) {
      oss.value = items
      // many
      if (items.length !== 0) {
        formData.value.ossLinks = items
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = createPensionOwnerfeedbackHandle // 模板修改标记
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
      oss,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      disabledDate,
      uploadSuccessHandle,
      submitHandle
    }
  }
})
</script>
