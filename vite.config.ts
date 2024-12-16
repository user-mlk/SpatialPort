import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 自动导入icon npm install -D unplugin-icons
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'

// 自动导入路由
import VueRouter from 'unplugin-vue-router/vite'

import path from 'path'

const pathSrc = path.resolve(__dirname, 'src')

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
        api: 'modern-compiler',
      },
    },
  },
  plugins: [
    Vue(),
    // https://uvr.esm.is/introduction
    VueRouter({
      extensions: ['.vue', '.md'],
      dts: 'src/typed-router.d.ts',
      //  自动导入路由文件， 可以配置多个入口文件
      routesFolder: [
        {
          src: 'src/views',
          exclude: ['**/component', '**/components'],
        },
      ],
    }),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      imports: ['vue'],

      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        // Auto register Element Plus components
        ElementPlusResolver({
          importStyle: 'sass',
        }),
        // Auto register icon components
        // 自动注册图标组件
        // 自动导入 icon 图标的 icon ，是需要以{prefix}-{collection}-{icon}即 ~ “前缀-使用的图标库名称-图标名” 格式形式来使用的，
        // IconsResolver({
        //   prefix: 'icon',
        //   enabledCollections: ['ep'],
        // }),
      ],
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    // Icons({
    //   autoInstall: true,
    // }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
