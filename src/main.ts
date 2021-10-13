import 'virtual:svg-icons-register';
import 'element-plus/lib/theme-chalk/index.css';
import '/@/assets/icons'
import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from '/@/router';
import { setupStore } from '/@/store';
import { setupI18N } from './locales';
import '/@/styles/index.sass'

async function bootstrap() {
  const app = createApp(App);
  // 初始化i18n
  setupI18N(app);
  // 初始化vuex
  setupStore(app);
  // 初始化base路由
  setupRouter(app);

  await router.isReady();
  app.mount('#app');
}

void bootstrap()
