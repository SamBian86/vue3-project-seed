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
        <el-form-item :label="$t('CardOperationinterface.operationInterfaceName')" prop="operationInterfaceName">
          <el-input
            v-model="formData.operationInterfaceName"
            :placeholder="$t('CardOperationinterface.operationInterfaceNamePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('CardOperationinterface.operationInterfaceType')" prop="operationInterfaceType">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.operationInterfaceType"
            :placeholder="$t('CardOperationinterface.operationInterfaceTypePlaceHolder')"
            :disabled="pageType !== 'create'"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('interfaceType', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('CardOperationinterface.operationId')" prop="operationId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.operationId"
            :placeholder="$t('CardOperationinterface.operationIdPlaceHolder')"
            :disabled="pageType !== 'create'"
            filterable
            clearable
          >
            <el-option v-for="item in cardOperationinfoSelect" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('CardOperationinterface.classPath')" prop="classPath">
          <el-input
            v-model="formData.classPath"
            :placeholder="$t('CardOperationinterface.classPathPlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('CardOperationinterface.requestType')" prop="requestType">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.requestType"
            :placeholder="$t('CardOperationinterface.requestTypePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in requestTypeSelectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('CardOperationinterface.description')" prop="description">
          <el-input
            type="textarea"
            :rows="10"
            v-model="formData.description"
            :placeholder="$t('CardOperationinterface.descriptionPlaceHolder')"
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
import useCardOperationinterfaceRepository from './useCardOperationinterfaceRepository' // 模板修改标记
import useCardOperationinfoRepository from '../operationinfo/useCardOperationinfoRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'CardOperationinterfaceForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const {
      formData,
      createCardOperationinterfaceHandle,
      updateCardOperationinterfaceHandle,
      getCardOperationinterfaceByIdHandle,
      formPageResetHandle
    } = useCardOperationinterfaceRepository() // 模板修改标记
    const { cardOperationinfoSelect, getCardOperationinfoSelectHandle } = useCardOperationinfoRepository()
    getCardOperationinfoSelectHandle()
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
          getCardOperationinterfaceByIdHandle(params, hideSkeleton) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据
    const requestTypeSelectOptions = ref([
      { label: 'GET', value: 'GET' },
      { label: 'POST', value: 'POST' },
      { label: 'PUT', value: 'PUT' },
      { label: 'DELETE', value: 'DELETE' }
    ])
    // 模板修改标记

    // 校验
    const rules = {
      operationInterfaceName: [
        { required: true, message: t('CardOperationinterface.operationInterfaceNamePlaceHolder'), trigger: 'blur' }
      ], // 模板修改标记
      operationInterfaceType: [
        { required: true, message: t('CardOperationinterface.operationInterfaceTypePlaceHolder'), trigger: 'change' }
      ],
      operationId: [{ required: true, message: t('CardOperationinterface.operationIdPlaceHolder'), trigger: 'change' }],
      classPath: [{ required: true, message: t('CardOperationinterface.classPathPlaceHolder'), trigger: 'blur' }],
      requestType: [{ required: true, message: t('CardOperationinterface.requestTypePlaceHolder'), trigger: 'change' }],
      description: [{ required: true, message: t('CardOperationinterface.descriptionPlaceHolder'), trigger: 'blur' }]
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createCardOperationinterfaceHandle : updateCardOperationinterfaceHandle // 模板修改标记
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
      requestTypeSelectOptions,
      submitHandle,
      cardOperationinfoSelect
    }
  }
})
</script>
