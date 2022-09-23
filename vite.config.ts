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
      }
    },
    server: {
      host: '0.0.0.0',
      port: 5000,
      proxy: {
        '/api': {
          target: 'http://47.102.42.66',
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
