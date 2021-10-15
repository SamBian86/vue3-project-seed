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
        <el-form-item :label="$t('SysRole.name')" prop="name">
          <el-input v-model="formData.name" :placeholder="$t('SysRole.name')" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('SysRole.deptId')" prop="deptId">
          <el-cascader
            :class="'form-page-cascader'"
            v-model="formData.deptId"
            :options="sysDeptTree"
            :props="cascaderProps"
            :placeholder="$t('SysRole.deptIdPlaceHolder')"
          ></el-cascader>
        </el-form-item>
        <el-form-item :label="$t('SysRole.remark')" prop="remark">
          <el-input type="textarea" :rows="10" v-model="formData.remark" :placeholder="$t('SysRole.remark')" clearable></el-input>
        </el-form-item>
        <el-form-item v-if="pageType === 'create' || pageType === 'update'">
          <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
            {{ $t('form.submit') }}
          </el-button>
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysRole.menuIdList')" prop="menuIdList">
          <TreeItem
            ref="menuTree"
            :tree-method="getSysMenuPermissionListTreeHandle"
            :response-name="'backgroundTree'"
            :default-checked-keys="formData.menuIdList"
            :expand-on-click-node="false"
            :props="defaultMenuProps"
            :check-strictly="true"
            show-checkbox
            node-key="id"
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysRole.deptIdList')" prop="deptIdList">
          <TreeItem
            ref="deptTree"
            :tree-method="getSysDeptPermissionListTreeHandle"
            :default-checked-keys="formData.deptIdList"
            :expand-on-click-node="false"
            :props="defaultDeptProps"
            :check-strictly="true"
            show-checkbox
            node-key="id"
          />
        </el-form-item>
      </el-col>
      <el-col :xs="StyleEnum.COL_XS" :sm="StyleEnum.COL_SM" :md="6" :lg="6" :xl="6">
        <el-form-item :label="$t('SysRole.appMenuIdList')" prop="appMenuIdList">
          <TreeItem
            ref="appMenuTree"
            :tree-method="getSysMenuPermissionListTreeHandle"
            :response-name="'appTree'"
            :default-checked-keys="formData.appMenuIdList"
            :expand-on-click-node="false"
            :props="defaultMenuProps"
            :check-strictly="true"
            show-checkbox
            node-key="id"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang='ts'>
// 基础支持
import { defineComponent, ref, watch, unref, toRef, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { StyleEnum } from '/@/enums/styleEnum'
import { mapGetters } from 'vuex'
// components
import { TreeItem } from '/@/components/TreeItem'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
import useTreeItemComponent from '/@/hooks/component/treeItem'
// API封装
import useSysRoleRepository from './useSysRoleRepository' // 模板修改标记
import useSysDeptRepository from '/@/views/pages/sys/dept/useSysDeptRepository'
import useSysMenuRepository from '/@/views/pages/sys/menu/useSysMenuRepository'

// mixin
import formMixin from '/@/mixins/formMixin'
export default defineComponent({
  name: 'SysRoleForm', // 模板修改标记
  mixins: [formMixin],
  components: { TreeItem },
  computed: {
    ...mapGetters('dict', ['getDictByType'])
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const pageType = ref(props.pageType)
    const { formData, createSysRoleHandle, updateSysRoleHandle, getSysRoleByIdHandle, formPageResetHandle } =
      useSysRoleRepository() // 模板修改标记
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
          getSysRoleByIdHandle(params, hideSkeleton) // 模板修改标记
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------
    // 默认值
    function defaultConfigHandle() {}

    // 相关页面基础数据

    // 后台权限
    const { getSysMenuPermissionListTreeHandle } = useSysMenuRepository()
    const menuTree = ref(null)
    const appMenuTree = ref(null)
    const menuTreeComponent = useTreeItemComponent(menuTree)
    const appMenuTreeComponent = useTreeItemComponent(appMenuTree)
    const defaultMenuProps = ref({
      children: 'children',
      label: 'name',
      id: 'id'
    })

    // 数据权限
    const { sysDeptTree, getSysDeptTreeHandle, getSysDeptPermissionListTreeHandle } = useSysDeptRepository()
    getSysDeptTreeHandle()
    const deptTree = ref(null)
    const deptTreeComponent = useTreeItemComponent(deptTree)
    const defaultDeptProps = ref({
      children: 'children',
      label: 'label',
      id: 'id'
    })

    // 校验
    const rules = {
      name: [{ required: true, message: t('SysRole.namePlaceHolder'), trigger: 'blur' }], // 模板修改标记
      deptId: [{ required: true, message: t('SysRole.deptIdPlaceHolder'), trigger: 'change' }] // 模板修改标记
    }

    const cascaderProps = ref({
      label: 'label',
      value: 'id',
      checkStrictly: true,
      emitPath: false
    })

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createSysRoleHandle : updateSysRoleHandle // 模板修改标记
      const menuIdList = menuTreeComponent.getCheckedKeys()
      const deptIdList = deptTreeComponent.getCheckedKeys()
      const appMenuIdList = appMenuTreeComponent.getCheckedKeys()
      const cFormData = { ...unref(formData), menuIdList, deptIdList, appMenuIdList }
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
      // 后台权限
      menuTree,
      appMenuTree,
      defaultMenuProps,
      sysDeptTree,
      getSysMenuPermissionListTreeHandle,
      // 数据权限
      deptTree,
      cascaderProps,
      defaultDeptProps,
      getSysDeptPermissionListTreeHandle,
      // 表单中相关项初始化数据
      submitHandle
    }
  }
})
</script>
