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
        <el-form-item :label="$t('SysFrontUser.tagIds')" prop="tagIds">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.tagIds"
            :placeholder="$t('SysFrontUser.tagIdsPlaceHolder')"
            multiple
            filterable
            clearable
          >
            <el-option v-for="item in sysTagListAll" :key="item.id" :label="item.tagName" :value="item.id"></el-option>
          </el-select>
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
import useSysFrontUserRepository from './useSysFrontUserRepository' // 模板修改标记
import useSysTagRepository from '/@/views/pages/sys/tag/useSysTagRepository' // 模板修改标记
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'SysFrontUserForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const { formData, tagSysFrontUserBinHandle } = useSysFrontUserRepository() // 模板修改标记
    const { sysTagListAll, getSysTagListAllHandle } = useSysTagRepository()
    getSysTagListAllHandle()
    const ruleForm = ref(null)
    const { formPageSubmitHandle } = useFormPageComponent(ruleForm)

    formData.value.tagIds = props.pageParams.tagIds
    // 校验
    const rules = {
      tagIds: [{ required: true, message: t('SysFrontUser.tagIdsPlaceHolder'), trigger: 'change' }] // 模板修改标记
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = tagSysFrontUserBinHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, { ...props.pageParams, ...cFormData }, () => {
        emit('before-close')
        emit('update-table')
      })
    }

    return {
      // 基础支持
      StyleEnum,
      // 表单数据
      formData,
      rules,
      // 表单引用
      ruleForm,
      // 表单中相关项初始化数据
      submitHandle,
      sysTagListAll
    }
  }
})
</script>
