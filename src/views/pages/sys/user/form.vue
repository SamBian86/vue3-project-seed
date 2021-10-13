<template>
  <el-form
    ref="ruleForm"
    :model="formData"
    :rules="rules"
    :size="StyleEnum.FORM_SIZE"
    :label-width="StyleEnum.FORM_LABEL_WIDTH"
    :disabled="pageType === 'detail'"
  >
    <el-form-item :label="$t('SysUser.username')" prop="username">
      <el-input v-model="formData.username" :placeholder="$t('SysUser.usernamePlaceHolder')" clearable></el-input>
    </el-form-item>
    <el-form-item :label="$t('SysUser.deptId')" prop="deptId">
      <el-select
        class="el-select-block"
        :size="StyleEnum.FORM_SIZE"
        v-model="formData.deptId"
        :placeholder="$t('SysUser.deptIdPlaceHolder')"
        clearable
      >
        <el-option v-for="item in sysDeptList" :key="item.deptId" :label="item.name" :value="item.deptId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('SysUser.email')" prop="email">
      <el-input v-model="formData.email" :placeholder="$t('SysUser.emailPlaceHolder')" clearable></el-input>
    </el-form-item>
    <el-form-item :label="$t('SysUser.mobile')" prop="mobile">
      <el-input v-model="formData.mobile" :placeholder="$t('SysUser.mobilePlaceHolder')" clearable></el-input>
    </el-form-item>
    <el-form-item :label="$t('SysUser.name')" prop="name">
      <el-input v-model="formData.name" :placeholder="$t('SysUser.namePlaceHolder')" clearable></el-input>
    </el-form-item>
    <el-form-item :label="$t('SysUser.position')" prop="position">
      <el-select
        class="el-select-block"
        :size="StyleEnum.FORM_SIZE"
        v-model="formData.position"
        :placeholder="$t('SysUser.positionPlaceHolder')"
        clearable
      >
        <el-option
          v-for="item in getDictByType('position', 'number')"
          :key="item.dictValue"
          :label="item.dictLabel"
          :value="item.dictValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('SysUser.roleIdList')" prop="roleIdList">
      <el-select
        class="el-select-block"
        :size="StyleEnum.FORM_SIZE"
        v-model="formData.roleIdList"
        :placeholder="$t('SysUser.roleIdPlaceHolder')"
        multiple
        clearable
      >
        <el-option v-for="item in sysRoleList" :key="item.roleId" :label="item.name" :value="item.roleId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('SysUser.remark')" prop="remark">
      <el-input type="textarea" :rows="10" v-model="formData.remark" :placeholder="$t('SysUser.remarkPlaceHolder')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('SysUser.status')" prop="status">
      <el-radio-group v-model="formData.status">
        <el-radio v-for="item in statusRadioItems" :label="item.label">
          {{ item.name }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('SysUser.superAdmin')" prop="superAdmin">
      <el-radio-group v-model="formData.superAdmin">
        <el-radio v-for="item in superAdminRadioItems" :label="item.label">
          {{ item.name }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="pageType === 'create' || pageType === 'update'">
      <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
        {{ $t('form.submit') }}
      </el-button>
    </el-form-item>
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
import useSysUserRepository from './useSysUserRepository' // 模板修改标记
import useSysDeptRepository from '/@/views/pages/sys/dept/useSysDeptRepository'
import useSysRoleRepository from '/@/views/pages/sys/role/useSysRoleRepository'

// mixin
import formMixin from '/@/mixins/formMixin'
// validate
import { validatePhoneHandle } from '/@/utils/validate' // 模板修改标记
export default defineComponent({
  name: 'SysUserForm', // 模板修改标记
  mixins: [formMixin],
  components: {},
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createSysUserHandle, updateSysUserHandle, getSysUserByIdHandle, formPageResetHandle } =
      useSysUserRepository() // 模板修改标记
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
        // debugger
        // console.log('already')
        // 修改变成创建
        if (type === 'create') {
          formPageResetHandle(hideSkeleton)
          defaultConfigHandle()
        }
        if (type === 'update' || type === 'detail') {
          getSysUserByIdHandle(params, hideSkeleton) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    const { sysDeptList, getSysDeptListHandle } = useSysDeptRepository()
    getSysDeptListHandle()
    const { sysRoleList, getSysRoleListHandle } = useSysRoleRepository()
    getSysRoleListHandle()

    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据
    const statusRadioItems = ref([
      { name: '停用', label: 0 },
      { name: '正常', label: 1 }
    ])

    const superAdminRadioItems = ref([
      { name: '否', label: 0 },
      { name: '是', label: 1 }
    ])

    // 校验
    const rules = {
      deptId: [{ required: true, message: t('SysUser.deptIdPlaceHolder'), trigger: 'change' }], // 模板修改标记
      email: [{ required: true, message: t('SysUser.emailPlaceHolder'), trigger: 'blur' }], // 模板修改标记
      mobile: [
        {
          required: true,
          trigger: 'blur',
          validator: (rule: any, value: any, callback: any) => {
            validatePhoneHandle(rule, value, callback, t)
          }
        }
      ], // 模板修改标记
      name: [{ required: true, message: t('SysUser.namePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      position: [{ required: true, message: t('SysUser.positionPlaceHolder'), trigger: 'change' }], // 模板修改标记
      status: [{ required: true, message: t('SysUser.statusPlaceHolder'), trigger: 'change' }] // 模板修改标记
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createSysUserHandle : updateSysUserHandle // 模板修改标记
      const cFormData = unref(formData)
      formPageSubmitHandle(cMethod, cFormData, () => {
        emit('update-table')
        emit('show-skeleton')
        emit('hide-dialog')
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
      statusRadioItems,
      superAdminRadioItems,
      // 表单中相关项初始化数据
      sysDeptList,
      sysRoleList,
      submitHandle
    }
  }
})
</script>
