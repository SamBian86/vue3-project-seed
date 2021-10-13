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
        <el-form-item :label="$t('SysCommunity.paddress')" prop="paddress">
          <CascaderItem
            ref="cascaderItem"
            :show-text="formData.paddress"
            :data-method="getSysAddressHandle"
            :lazy="true"
            :disabled="pageType === 'detail'"
            :placeholder="$t('SysCommunity.paddressPlaceHolder')"
            @cascader-change-handle="cascaderChangeHandle"
          ></CascaderItem>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysCommunity.name')" prop="name">
          <el-input v-model="formData.name" :placeholder="$t('SysCommunity.namePlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysCommunity.serverAreaIds')" prop="serverAreaIds">
          <el-select
            class="el-select-block"
            :size="StyleEnum.FORM_SIZE"
            v-model="formData.serverAreaIds"
            :placeholder="$t('SysCommunity.serverAreaIdsPlaceHolder')"
            multiple
            filterable
            clearable
          >
            <el-option v-for="item in sysServerareaSelect" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysCommunity.deptId')" prop="deptId">
          <el-cascader
            :class="'form-page-cascader'"
            v-model="formData.deptId"
            :options="sysDeptTree"
            :props="cascaderProps"
            :placeholder="$t('SysCommunity.deptIdPlaceHolder')"
          ></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysCommunity.familyLocation')" prop="familyLocation">
          <el-switch
            v-model="formData.familyLocation"
            :active-color="StyleEnum.FORM_SWITCH_ACTIVE_COLOR"
            :inactive-color="StyleEnum.FORM_SWITCH_INACTIVE_COLOR"
          ></el-switch>
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
import { CascaderItem } from '/@/components/CascaderItem'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysCommunityRepository from './useSysCommunityRepository' // 模板修改标记
import useSysServerareaRepository from '/@/views/pages/sys/serverarea/useSysServerareaRepository' // 模板修改标记
import useSysDeptRepository from '/@/views/pages/sys/dept/useSysDeptRepository' // 模板修改标记
import useSysAddressRepository from '/@/views/pages/sys/address/useSysAddressRepository'

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
// import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'SysCommunityForm', // 模板修改标记
  mixins: [formMixin],
  components: { CascaderItem },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createSysCommunityHandle, updateSysCommunityHandle, getSysCommunityByIdHandle, formPageResetHandle } =
      useSysCommunityRepository() // 模板修改标记
    const { sysServerareaSelect, getSysServerareaSelectHandle } = useSysServerareaRepository()
    getSysServerareaSelectHandle()
    const { sysDeptTree, getSysDeptTreeHandle } = useSysDeptRepository()
    getSysDeptTreeHandle()
    const { getSysAddressHandle } = useSysAddressRepository()
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
          getSysCommunityByIdHandle(params, hideSkeleton).then((response) => {
            // 需要在获取数据那里处理paddress
            const { provinceName, cityName, areaName, streetName } = response
            if (provinceName && cityName && areaName && streetName) {
              formData.value['paddress'] = `${provinceName} / ${cityName} / ${areaName} / ${streetName}`
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

    const cascaderProps = ref({
      label: 'label',
      value: 'id',
      checkStrictly: true,
      emitPath: false
    })

    // 校验
    const rules = {
      bbb: [{ required: true, message: t('AAA.bbbPlaceHolder'), trigger: 'blur' }] // 模板修改标记
    }

    // 行政区块回调处理
    function cascaderChangeHandle(data: { selected: any[]; store: Object }) {
      const { selected, store } = data
      if (selected.length === 4) {
        formData.value['provinceCode'] = selected[0]
        formData.value['cityCode'] = selected[1]
        formData.value['areaCode'] = selected[2]
        formData.value['streetCode'] = selected[3]
        formData.value['paddress'] = `${getValue(selected[0])} / ${getValue(selected[1])} / ${getValue(selected[2])} / ${getValue(
          selected[3]
        )}`
      }

      function getValue(key: any) {
        return store[key] ? store[key] : ''
      }
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createSysCommunityHandle : updateSysCommunityHandle // 模板修改标记
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
      cascaderProps,
      submitHandle,
      cascaderChangeHandle,
      sysServerareaSelect,
      sysDeptTree,
      getSysAddressHandle
    }
  }
})
</script>
