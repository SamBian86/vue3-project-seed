<template>
  <div class="yunlin-header-user">
    <el-dropdown size="small">
      <span>
        <el-image
          class="user-avatar"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="cover"
        >
        </el-image>
        用户信息<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <i class="el-icon-edit"></i>修改密码
          </el-dropdown-item>
          <el-dropdown-item @click="logout">
            <i class="el-icon-switch-button"></i>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { ElMessageBox, ElMessage } from "element-plus";
import { defineComponent } from "vue";
import { useStore, mapMutations } from "vuex";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "LayoutHeaderUser",
  components: {},
  methods: {
    ...mapMutations("site", ["LOGOUT"]),
  },
  setup(props, { slots }) {
    const { t } = useI18n();
    const store = useStore();
    const logout = () => {
      ElMessageBox.confirm(t("logout.title"), t("global.tips"), {
        confirmButtonText: t("global.confirm"),
        cancelButtonText: t("global.cancel"),
        type: "warning",
      }).then(() => {
        // 退出
        store.dispatch("site/LOGOUT", { requestSuccessHook });
      });
    };

    function requestSuccessHook(results: any) {
      ElMessage({
        type: "success",
        message: "退出成功!",
      });
      return results;
    }
    return {
      logout,
    };
  },
});
</script>
