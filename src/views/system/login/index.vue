<template>
  <div class="yunlin-login-container">
    <div class="yunlin-login-wrapper">
      <div class="yunlin-login">
        <div class="yunlin-slogan"></div>
        <div class="yunlin-form-wrapper">
          <div class="yunlin-form">
            <el-form ref="form" :model="state" :rules="rules">
              <!-- <div class="yunlin-input-item">
                <input
                  type="text"
                  v-model="state.username"
                  placeholder="请输入账号"
                />
              </div> -->
              <el-form-item class="yunlin-input-item" prop="username">
                <el-input
                  v-model="state.username"
                  :placeholder="$t('login.usernamePlaceholder')"
                ></el-input>
              </el-form-item>
              <!-- <div class="yunlin-input-item">
                <input
                  type="password"
                  v-model="state.password"
                  placeholder="请输入密码"
                />
              </div> -->
              <el-form-item class="yunlin-input-item" prop="password">
                <el-input
                  type="password"
                  v-model="state.password"
                  :placeholder="$t('login.passwordPlaceholder')"
                ></el-input>
              </el-form-item>
              <!-- <div class="yunlin-input-item">
                <input
                  type="text"
                  v-model="state.captcha"
                  placeholder="请输入验证码"
                />
                <div class="yunlin-captcha">
                  <img
                    :src="captchaUrl"
                    :alt="$t('login.captcha')"
                    @click="getCaptchaHandle"
                  />
                </div>
              </div> -->
              <el-form-item class="yunlin-input-item" prop="captcha">
                <el-input
                  v-model="state.captcha"
                  :placeholder="$t('login.captchaPlaceholder')"
                ></el-input>
                <div class="yunlin-captcha">
                  <img
                    :src="captchaUrl"
                    :alt="$t('login.captcha')"
                    @click="getCaptchaHandle"
                  />
                </div>
              </el-form-item>
              <div class="yunlin-button-item" @click="loginHandle">
                {{ $t("login.login") }}
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, reactive, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { getCaptcha, buildUUID } from "/@/utils";
import { useStore, mapMutations } from "vuex";
export default defineComponent({
  name: "Login",
  methods: {
    ...mapMutations("site", ["LOGIN"]),
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();

    const captchaURI = getCaptcha();
    const state = reactive({
      uuid: "",
      password: "",
      username: "",
      captcha: "",
    });
    state.uuid = buildUUID();

    const captchaUrl = computed(() => {
      return captchaURI + state.uuid;
    });

    // 获取验证码
    function getCaptchaHandle() {
      state.uuid = buildUUID();
    }

    // 登录
    function loginHandle() {
      this.$refs["form"].validate((valid: any) => {
        if (valid) {
          store
            .dispatch("site/LOGIN", state)
            .then((response) => {})
            .catch((message: any) => {
              getCaptchaHandle();
            });
        } else {
          return false;
        }
      });
    }

    // 验证 username password captcha
    const rules = {
      username: [
        {
          required: true,
          message: t("login.usernamePlaceholder"),
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: t("login.passwordPlaceholder"),
          trigger: "blur",
        },
      ],
      captcha: [
        {
          required: true,
          message: t("login.captchaPlaceholder"),
          trigger: "blur",
        },
      ],
    };

    // 发送数据前对数据再次处理
    function beforeRequestHook(config: any) {
      return config;
    }

    // 获取数据以后对数据进行处理
    function requestSuccessHook(results: any) {
      return results;
    }

    // 请求成功以后数据错误状态处理
    function requestFailedHook(message: any, data: any) {
      return message;
    }

    return {
      getCaptchaHandle,
      loginHandle,
      captchaUrl,
      state,
      rules,
    };
  },
});
</script>
