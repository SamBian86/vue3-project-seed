<template>
  <div class="yunlin-header-language" v-if="getIsOpen">
    <el-dropdown size="small">
      <span>
        <SvgIcon name="earth"></SvgIcon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in languages"
            @click="setCurrentLanguage(item.language)"
            :class="{ 'language-is-actived': item.language === getLanguage }"
          >
            <span>{{ item.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { SvgIcon } from "/@/components/SvgIcon";
import { getLanguageConfig } from "/@/settings/languageConfig";
import { setLanguage } from "/@/utils/cache/localStorage";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "LayoutHeaderUser",
  components: { SvgIcon },
  computed: {
    // 获取语言
    ...mapGetters("language", ["getLanguage"]),
    // 用于判断是否展开
    ...mapGetters("adapter", ["getIsOpen"]),
  },
  setup(props, { slots }) {
    const languages = reactive(getLanguageConfig());

    function setCurrentLanguage(language: string) {
      setLanguage(language);
      window.location.reload();
    }
    return {
      setCurrentLanguage,
      languages,
    };
  },
});
</script>
