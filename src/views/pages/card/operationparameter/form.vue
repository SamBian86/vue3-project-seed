<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="120"
    :disabled="pageType === 'detail'"
  >
    <el-row :gutter="StyleEnum.ROW_GUTTER">
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('CardOperationparameter.parameterName')" prop="parameterName">
          <el-input
            v-model="formData.parameterName"
            :placeholder="$t('CardOperationparameter.parameterNamePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('CardOperationparameter.type')" prop="type">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.type"
            :placeholder="$t('CardOperationparameter.typePlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in getDictByType('interfaceParamType', 'number')"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('CardOperationparameter.parameterValue')" prop="parameterValue">
          <el-input
            v-model="formData.parameterValue"
            :placeholder="$t('CardOperationparameter.parameterValuePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('CardOperationparameter.operationId')" prop="operationId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.operationId"
            :placeholder="$t('CardOperationparameter.operationIdPlaceHolder')"
            :disabled="pageType !== 'create'"
            @change="operationChangeHandle"
            filterable
            clearable
          >
            <el-option v-for="item in cardOperationinfoSelect" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('CardOperationparameter.operationInterfaceId')" prop="operationInterfaceId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.operationInterfaceId"
            :placeholder="$t('CardOperationparameter.operationInterfaceIdPlaceHolder')"
            :disabled="pageType !== 'create'"
            filterable
            clearable
          >
            <el-option
              v-for="item in cardOperationinterfaceSelect"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('CardOperationparameter.sort')" prop="sort">
          <el-input v-model="formData.sort" :placeholder="$t('CardOperationparameter.sortPlaceHolder')" clearable></el-input>
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
import useCardOperationparameterRepository from './useCardOperationparameterRepository' // 模板修改标记
import useCardOperationinfoRepository from '../operationinfo/useCardOperationinfoRepository' // 模板修改标记
import useCardOperationinterfaceRepository from '../operationinterface/useCardOperationinterfaceRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'CardOperationparameterForm', // 模板修改标记
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
      createCardOperationparameterHandle,
      updateCardOperationparameterHandle,
      getCardOperationparameterByIdHandle,
      formPageResetHandle
    } = useCardOperationparameterRepository() // 模板修改标记
    const { cardOperationinfoSelect, getCardOperationinfoSelectHandle } = useCardOperationinfoRepository()
    getCardOperationinfoSelectHandle()
    const { cardOperationinterfaceSelect, getCardOperationinterfaceSelectHandle } = useCardOperationinterfaceRepository()

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
          getCardOperationparameterByIdHandle(params, hideSkeleton).then((response) => {
            const { operationId } = response
            getCardOperationinterfaceSelectHandle({ operationId })
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
      parameterName: [{ required: true, message: t('CardOperationparameter.parameterNamePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      type: [{ required: true, message: t('CardOperationparameter.typePlaceHolder'), trigger: 'change' }],
      operationId: [{ required: true, message: t('CardOperationparameter.operationIdPlaceHolder'), trigger: 'change' }],
      operationInterfaceId: [
        { required: true, message: t('CardOperationparameter.operationInterfaceIdPlaceHolder'), trigger: 'change' }
      ],
      sort: [{ required: true, message: t('CardOperationparameter.sortPlaceHolder'), trigger: 'blur' }]
    }

    function operationChangeHandle(value: any) {
      getCardOperationinterfaceSelectHandle({ operationId: value })
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createCardOperationparameterHandle : updateCardOperationparameterHandle // 模板修改标记
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
      submitHandle,
      cardOperationinfoSelect,
      cardOperationinterfaceSelect,
      operationChangeHandle
    }
  }
})
</script>
