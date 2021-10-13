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
        <el-form-item :label="$t('VolunteerServerchangehistory.type')" prop="type">
          <el-radio-group v-model="formData.type" @change="handleRadioChange">
            <el-radio-button v-for="item in typeItems" :label="item.label">
              {{ item.name }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('VolunteerServerchangehistory.count')" prop="count">
          <el-input
            v-model="formData.count"
            :placeholder="$t('VolunteerServerchangehistory.countPlaceHolder')"
            clearable
            @change="handleCountChange"
          >
            <template #append>小时</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('VolunteerServerchangehistory.operateNote')" prop="operateNote">
          <el-input
            type="textarea"
            :rows="10"
            v-model="formData.operateNote"
            :placeholder="$t('VolunteerServerchangehistory.operateNotePlaceHolder')"
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
import useVolunteerServerchangehistoryRepository from '../../serverchangehistory/useVolunteerServerchangehistoryRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'VolunteerServerchangehistoryForm', // 模板修改标记
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
      createVolunteerServerchangehistoryHandle,
      updateVolunteerServerchangehistoryHandle,
      getVolunteerServerchangehistoryByIdHandle,
      formPageResetHandle
    } = useVolunteerServerchangehistoryRepository() // 模板修改标记
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
          getVolunteerServerchangehistoryByIdHandle(params, hideSkeleton) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {
      formData.value.type = 'add'
    }

    // 相关页面基础数据
    const typeItems = ref([
      { name: '新增', label: 'add' },
      { name: '减少', label: 'reduce' }
    ])
    // 模板修改标记

    // 校验
    const rules = {
      type: [{ required: true, message: t('VolunteerServerchangehistory.typePlaceHolder'), trigger: 'change' }], // 模板修改标记
      count: [{ required: true, message: t('VolunteerServerchangehistory.countPlaceHolder'), trigger: 'blur' }], // 模板修改标记
      operateNote: [{ required: true, message: t('VolunteerServerchangehistory.operateNotePlaceHolder'), trigger: 'blur' }] // 模板修改标记
    }

    function handleRadioChange(item: any) {
      if (item === 'add') {
        formData.value.changeCount = parseFloat(formData.value.count)
      } else {
        formData.value.changeCount = -parseFloat(formData.value.count)
      }
    }
    function handleCountChange(item: any) {
      if (formData.value.type === 'add') {
        formData.value.changeCount = parseFloat(formData.value.count)
      } else {
        formData.value.changeCount = -parseFloat(formData.value.count)
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod =
        pageType.value === 'create' ? createVolunteerServerchangehistoryHandle : updateVolunteerServerchangehistoryHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, { ...cFormData, volunteerId: props.pageParams.volunteerId }, () => {
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
      typeItems,
      handleRadioChange,
      handleCountChange
    }
  }
})
</script>
