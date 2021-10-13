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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerInfo.name')" prop="name">
          <el-input v-model="formData.name" :placeholder="$t('VolunteerInfo.namePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerInfo.volunteerCode')" prop="volunteerCode">
          <el-input
            v-model="formData.volunteerCode"
            :placeholder="$t('VolunteerInfo.volunteerCodePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerInfo.phoneNumber')" prop="phoneNumber">
          <el-input v-model="formData.phoneNumber" :placeholder="$t('VolunteerInfo.phoneNumberPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerInfo.idCard')" prop="idCard">
          <el-input v-model="formData.idCard" :placeholder="$t('VolunteerInfo.idCardPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerInfo.sex')" prop="sex">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.sex"
            :placeholder="$t('VolunteerInfo.sexPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('sex', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerInfo.type')" prop="type">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.type"
            :placeholder="$t('VolunteerInfo.typePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('volunteerType', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerInfo.emergencyContactName')" prop="emergencyContactName">
          <el-input
            v-model="formData.emergencyContactName"
            :placeholder="$t('VolunteerInfo.emergencyContactNamePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="12" :lg="12" :xl="12">
        <el-form-item :label="$t('VolunteerInfo.emergencyContactPhoneNumber')" prop="emergencyContactPhoneNumber">
          <el-input
            v-model="formData.emergencyContactPhoneNumber"
            :placeholder="$t('VolunteerInfo.emergencyContactPhoneNumberPlaceHolder')"
            clearable
          ></el-input>
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
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useVolunteerInfoRepository from './useVolunteerInfoRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'VolunteerInfoForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createVolunteerInfoHandle, updateVolunteerInfoHandle, getVolunteerInfoByIdHandle, formPageResetHandle } =
      useVolunteerInfoRepository() // 模板修改标记
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
          getVolunteerInfoByIdHandle(params, hideSkeleton) // 模板修改标记
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
      name: [{ required: true, message: t('VolunteerInfo.namePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      phoneNumber: [{ required: true, message: t('VolunteerInfo.phoneNumberPlaceHolder'), trigger: 'blur' }],
      idCard: [{ required: true, message: t('VolunteerInfo.idCardPlaceHolder'), trigger: 'blur' }],
      sex: [{ required: true, message: t('VolunteerInfo.sexPlaceHolder'), trigger: 'change' }],
      type: [{ required: true, message: t('VolunteerInfo.typePlaceHolder'), trigger: 'change' }],
      emergencyContactName: [{ required: true, message: t('VolunteerInfo.emergencyContactNamePlaceHolder'), trigger: 'blur' }],
      emergencyContactPhoneNumber: [
        { required: true, message: t('VolunteerInfo.emergencyContactPhoneNumberPlaceHolder'), trigger: 'blur' }
      ]
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createVolunteerInfoHandle : updateVolunteerInfoHandle // 模板修改标记
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
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle
    }
  }
})
</script>
