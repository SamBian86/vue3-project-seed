import { resolve } from 'path';
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { ElementPlusResolver } from "vite-plugin-components";
import viteSvgIcons from "vite-plugin-svg-icons";

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{
      find: /\/@\//, replacement: pathResolve('src') + '/',
    }, {
      find: /\/#\//, replacement: pathResolve('types') + '/'
    }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`
      }
    }
  },
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [
        // 自动导入elementPlus
        ElementPlusResolver()
      ]
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    viteSvgIcons({
      iconDirs: [pathResolve('src/assets/icons/svg')],
      symbolId: "icon-[dir]-[name]"
    })
  ]
})
