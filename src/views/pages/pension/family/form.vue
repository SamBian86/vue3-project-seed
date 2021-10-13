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
        <el-form-item :label="$t('PensionFamily.communityCode')" prop="communityCode">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.communityCode"
            :placeholder="$t('PensionFamily.communityCodePlaceHolder')"
            @change="communityChangeHandle"
            filterable
            clearable
          >
            <el-option v-for="item in sysCommunityListAll" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionFamily.buildingId')" prop="buildingId">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.buildingId"
            :placeholder="$t('PensionFamily.buildingIdPlaceHolder')"
            filterable
            clearable
          >
            <el-option
              v-for="item in pensionBuildingListAll"
              :key="item.id"
              :label="item.buildingNumber"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('PensionFamily.roomNumber')" prop="roomNumber">
          <el-input v-model="formData.roomNumber" :placeholder="$t('PensionFamily.roomNumberPlaceHolder')" clearable></el-input>
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
import usePensionFamilyRepository from './usePensionFamilyRepository' // 模板修改标记
import useSysCommunityRepository from '/@/views/pages/sys/community/useSysCommunityRepository' // 模板修改标记
import usePensionBuildingRepository from '/@/views/pages/pension/building/usePensionBuildingRepository'
// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'PensionFamilyForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createPensionFamilyHandle, updatePensionFamilyHandle, getPensionFamilyByIdHandle, formPageResetHandle } =
      usePensionFamilyRepository() // 模板修改标记
    const { sysCommunityListAll, getSysCommunityListAllHandle } = useSysCommunityRepository()
    getSysCommunityListAllHandle()
    const { pensionBuildingListAll, getPensionBuildingListAllHandle } = usePensionBuildingRepository()

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
          getPensionFamilyByIdHandle(params, hideSkeleton).then((response: any) => {
            const { communityCode } = response

            getPensionBuildingListAllHandle({ communityCode })
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
      communityCode: [{ required: true, message: t('PensionFamily.communityCodePlaceHolder'), trigger: 'change' }],
      buildingId: [{ required: true, message: t('PensionFamily.buildingIdPlaceHolder'), trigger: 'change' }], // 模板修改标记
      roomNumber: [{ required: true, message: t('PensionFamily.roomNumberPlaceHolder'), trigger: 'blur' }]
    }

    // 社区变动事件
    function communityChangeHandle(value: any) {
      formData.value.buildingId = ''
      if (value) {
        getPensionBuildingListAllHandle({ communityCode: value })
      } else {
        pensionBuildingListAll.value = []
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createPensionFamilyHandle : updatePensionFamilyHandle // 模板修改标记
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
      communityChangeHandle,
      sysCommunityListAll,
      pensionBuildingListAll
    }
  }
})
</script>
