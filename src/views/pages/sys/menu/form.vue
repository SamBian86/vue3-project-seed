<template>
  <el-form ref="ruleForm" :model="formData" :rules="rules" :size="StyleEnum.FORM_SIZE" :label-width="StyleEnum.FORM_LABEL_WIDTH">
    <el-form-item :label="$t('SysMenu.type')" prop="type">
      <el-radio-group v-model="formData.type" :disabled="pageType !== 'create'">
        <el-radio-button v-for="item in typeItems" :label="item.label">
          {{ item.name }}
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="$t('SysMenu.name')" prop="name">
      <el-input v-model="formData.name" :placeholder="$t('SysMenu.namePlaceHolder')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('SysMenu.pid')" prop="pid">
      <el-cascader
        :class="'form-page-cascader'"
        v-model="formData.pid"
        :options="getMenuDatas"
        :props="cascaderProps"
        :placeholder="$t('SysMenu.pidPlaceHolder')"
      ></el-cascader>
    </el-form-item>
    <el-form-item v-if="formData.type === 0" :label="$t('SysMenu.url')" prop="url">
      <el-input v-model="formData.url" :placeholder="$t('SysMenu.urlPlaceHolder')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('SysMenu.sort')" prop="sort">
      <el-input v-model="formData.sort" :placeholder="$t('SysMenu.sortPlaceHolder')"></el-input>
    </el-form-item>
    <el-form-item v-if="formData.type === 0" :label="$t('SysMenu.icon')" prop="icon">
      <IconList :data="formData.icon" @icon-listen="iconListen" />
    </el-form-item>
    <el-form-item :label="$t('SysMenu.permissions')" prop="permissions" v-if="formData.type === 1">
      <el-input v-model="formData.permissions" :placeholder="$t('SysMenu.permissionsPlaceHolder')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('SysMenu.resourceList')" prop="resourceList">
      <ResourceList :data="formData.resourceList" @resource-listen="resourceListen" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitHandle" :size="StyleEnum.BUTTON_SIZE">
        {{ $t('form.submit') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
// 基础支持
import { defineComponent, ref, watch, unref, onMounted } from 'vue'
import { mapGetters } from 'vuex'
import { StyleEnum } from '/@/enums/styleEnum'
// components
import { IconList } from '/@/components/IconList'
import { ResourceList } from '/@/components/ResourceList'
// hooks
import useFormPageComponent from '/@/hooks/component/formPage'
// API封装
import useSysMenuRepository from './useSysMenuRepository'
// mixin
import formMixin from '/@/mixins/formMixin'
export default defineComponent({
  name: 'SysMenuForm',
  mixins: [formMixin],
  components: {
    IconList,
    ResourceList
  },
  computed: {
    // 用于判断是否有权限的方法
    ...mapGetters('menu', ['getMenuDatas'])
  },
  setup(props, { emit }) {
    const pageType = ref(props.pageType)
    const { formData, createSysMenuHandle, updateSysMenuHandle, getSysMenuByIdHandle, formPageResetHandle } =
      useSysMenuRepository()
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
          getSysMenuByIdHandle(params, hideSkeleton)
        }
        pageType.value = type
      })
    })

    // 以下是页面逻辑---------------------------------------------------------------

    // 默认值
    function defaultConfigHandle() {
      formData.value.type = 0
    }

    const typeItems = ref([
      { name: '菜单', label: 0 },
      { name: '按钮', label: 1 }
    ])

    const cascaderProps = ref({
      label: 'name',
      value: 'id',
      checkStrictly: true,
      emitPath: false
    })

    // 校验
    const rules = {
      name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
    }

    // 监听iconListen改动
    function iconListen(item: { name: any }) {
      formData.value.icon = item.name
    }

    // 监听resourceListen改动
    function resourceListen(item: any) {
      formData.value.resourceList = item
    }

    // 提交逻辑
    function submitHandle() {
      const cMethod = pageType.value === 'create' ? createSysMenuHandle : updateSysMenuHandle
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
      typeItems,
      cascaderProps,
      iconListen,
      resourceListen,
      submitHandle
    }
  }
})
</script>