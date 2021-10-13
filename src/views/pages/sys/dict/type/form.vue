<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="StyleEnum.FORM_LABEL_WIDTH"
    :disabled="pageType === 'detail'"
  >
    <el-form-item :label="$t('SysDictType.dictName')" prop="dictName">
      <el-input v-model="formData.dictName" :placeholder="$t('SysDictType.dictNamePlaceHolder')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('SysDictType.dictType')" prop="dictType">
      <el-input v-model="formData.dictType" :placeholder="$t('SysDictType.dictTypePlaceHolder')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('SysDictType.sort')" prop="sort">
      <el-input-number v-model="formData.sort" :placeholder="$t('SysDictType.sortPlaceHolder')"></el-input-number>
    </el-form-item>
    <el-form-item :label="$t('SysDictType.remark')" prop="remark">
      <el-input type="textarea" v-model="formData.remark" :placeholder="$t('SysDictType.remarkPlaceHolder')"></el-input>
    </el-form-item>
    <el-form-item v-if="pageType === 'create' || pageType === 'update'">
      <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
        {{ $t('form.submit') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
// 基础支持
import { defineComponent, ref, watch, unref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { StyleEnum } from '/@/enums/styleEnum'
// components
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysDictTypeRepository from './useSysDictTypeRepository'
// mixin
import formMixin from '/@/mixins/formMixin'
export default defineComponent({
  name: 'SysDictTypeForm',
  mixins: [formMixin],
  components: {},
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createSysDictTypeHandle, updateSysDictTypeHandle, getSysDictTypeByIdHandle, formPageResetHandle } =
      useSysDictTypeRepository()
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
        // 修改变成创建
        if (type === 'create') {
          formPageResetHandle(hideSkeleton)
          defaultConfigHandle()
        }
        if (type === 'update' || type === 'detail') {
          getSysDictTypeByIdHandle(params, hideSkeleton)
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------

    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据

    // 校验
    const rules = {
      dictName: [{ required: true, message: t('SysDictType.dictNamePlaceHolder'), trigger: 'blur' }],
      dictType: [{ required: true, message: t('SysDictType.dictTypePlaceHolder'), trigger: 'blur' }],
      sort: [{ required: true, message: t('SysDictType.sortPlaceHolder'), trigger: 'blur' }]
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createSysDictTypeHandle : updateSysDictTypeHandle
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, cFormData, () => {
        emit('update-table')
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