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
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysBusiness.unitType')" prop="unitType">
          <el-radio-group v-model="formData.unitType" :disabled="true">
            <el-radio-button v-for="item in unitTypeItems" :label="item.label">
              {{ item.name }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysBusiness.deptId')" prop="deptId">
          <el-cascader
            :class="'form-page-cascader'"
            v-model="formData.deptId"
            :options="sysDeptTree"
            :props="cascaderProps"
            :placeholder="$t('SysBusiness.deptIdPlaceHolder')"
          ></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysBusiness.linkman')" prop="linkman">
          <el-input v-model="formData.linkman" :placeholder="$t('SysBusiness.linkmanPlaceHolder')" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysBusiness.linktelephone')" prop="linktelephone">
          <el-input
            v-model="formData.linktelephone"
            :placeholder="$t('SysBusiness.linktelephonePlaceHolder')"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="24" :lg="24" :xl="24">
        <el-form-item :label="$t('SysBusiness.address')" prop="address">
          <AMapAddress
            :show-text="formData.address"
            :lng="formData.lng"
            :lat="formData.lat"
            :style-text="'height: 300px'"
            :placeholder="$t('SysBusiness.addressPlaceHolder')"
            :page-type="pageType"
            :auto-complete-open="true"
            @address-change-handle="addressChangeHandle"
          />
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
import { AMapAddress } from '/@/components/AMapAddress'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysBusinessRepository from './useSysBusinessRepository' // 模板修改标记
import useSysDeptRepository from '/@/views/pages/sys/dept/useSysDeptRepository' // 模板修改标记

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'SysBusinessForm', // 模板修改标记
  mixins: [formMixin],
  components: { AMapAddress },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createSysBusinessHandle, updateSysBusinessHandle, getSysBusinessByIdHandle, formPageResetHandle } =
      useSysBusinessRepository() // 模板修改标记
    const { sysDeptTree, getSysDeptTreeHandle } = useSysDeptRepository()
    getSysDeptTreeHandle()

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
          getSysBusinessByIdHandle(params, hideSkeleton) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {
      formData.value.unitType = 1
    }

    // 相关页面基础数据
    // 模板修改标记
    const unitTypeItems = ref([
      { name: '内部商家', label: 1 },
      { name: '外部商家', label: 2 }
    ])
    const cascaderProps = ref({
      label: 'label',
      value: 'id',
      checkStrictly: true,
      emitPath: false
    })

    // 地址变动事件
    function addressChangeHandle(data: { address: any; lng: any; lat: any }) {
      const { address, lng, lat } = data
      formData.value['address'] = address
      formData.value['lng'] = lng
      formData.value['lat'] = lat
    }

    // 校验
    const rules = {
      unitType: [{ required: true, message: t('SysBusiness.unitTypePlaceHolder'), trigger: 'change' }], // 模板修改标记
      deptId: [{ required: true, message: t('SysBusiness.deptIdPlaceHolder'), trigger: 'change' }],
      linkman: [{ required: true, message: t('SysBusiness.linkmanPlaceHolder'), trigger: 'blur' }],
      linktelephone: [
        {
          required: true,
          message: t('SysBusiness.linktelephonePlaceHolder'),
          trigger: 'blur',
          validator: (rule: any, value: any, callback: any) => {
            validatePhoneHandle(rule, value, callback, t)
          }
        }
      ],
      address: [{ required: true, message: t('SysBusiness.addressPlaceHolder'), trigger: 'blur' }]
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createSysBusinessHandle : updateSysBusinessHandle // 模板修改标记
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
      unitTypeItems,
      cascaderProps,
      sysDeptTree,
      addressChangeHandle
    }
  }
})
</script>
