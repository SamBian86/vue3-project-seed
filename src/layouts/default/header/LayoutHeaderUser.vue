<template>
  <div class="yunlin-header-user">
    <el-dropdown size="small">
      <span v-if="!getIsMobile">
        <el-image
          class="user-avatar"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="cover"
        ></el-image>
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <span v-else>
        <el-image
          class="user-avatar"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="cover"
        ></el-image>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="modify">
            <i class="el-icon-edit"></i>
            修改密码
          </el-dropdown-item>
          <el-dropdown-item @click="logout">
            <i class="el-icon-switch-button"></i>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <DialogPage ref="dialogPage">
      <template #body>
        <div class="component-skeleton-page">
          <AuthModifyPassword :page-type="'update'" @hide-dialog="hideDialog" />
        </div>
      </template>
      <template #title>
        {{ $t('modify.pageTitle') }}
      </template>
    </DialogPage>
  </div>
</template>

<script lang="ts">
import { ElMessageBox, ElMessage } from 'element-plus'
import { defineComponent, ref, onMounted } from 'vue'
import { useStore, mapGetters } from 'vuex'
import { useI18n } from 'vue-i18n'
// components
import { DialogPage } from '/@/components/DialogPage'
// hooks
import useDialogPageComponent from '/@/hooks/component/dialogPage'
import AuthModifyPassword from '/@/views/pages/auth/modifyPassword.vue'
export default defineComponent({
  name: 'LayoutHeaderUser',
  components: { DialogPage, AuthModifyPassword },
  computed: {
    // 用于判断是否展开
    ...mapGetters('site', ['getIsMobile'])
  },
  setup(props, { slots }) {
    const { t } = useI18n()
    const store = useStore()
    const username = ref('')

    onMounted(() => {
      setTimeout(() => {
        username.value = store.getters['userInfo/getUserName']
      }, 200)
    })

    const logout = () => {
      ElMessageBox.confirm(t('logout.title'), t('global.tips'), {
        confirmButtonText: t('global.confirm'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      }).then(() => {
        // 退出
        store.dispatch('site/LOGOUT', { requestSuccessHook })
      })
    }

    function requestSuccessHook(results: any) {
      ElMessage({
        type: 'success',
        message: '退出成功!'
      })
      return results
    }

    // dialogPage相关代码开始
    const dialogPage = ref(null)
    const { showDialog, hideDialog } = useDialogPageComponent(dialogPage)

    function modify() {
      showDialog()
    }

    return {
      logout,
      modify,
      dialogPage,
      username,
      hideDialog
    }
  }
})
</script>
