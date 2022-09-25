import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePluginImp from 'vite-plugin-imp'
import eslintPlugin from 'vite-plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'

export default ({ mode }) => {
  const plugins: PluginOption[] = [vue(), vueJsx(), vitePluginImp(), eslintPlugin()]
  if (mode !== 'dev') {
    plugins.push(visualizer() as PluginOption)
  }
  return defineConfig({
    build: {
      lib: {
        entry: resolve(__dirname, 'lib/main.ts'),
        name: 'NjhhUi',
        // the proper extensions will be added
        fileName: 'njhh-ui'
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue'
          }
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 5000,
      proxy: {
        '/api': {
          target: 'http://47.102.42.66',
          changeOrigin: true
        },
        '/geoserver': {
          target: 'http://47.102.42.66:8080',
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    plugins
  })
}
