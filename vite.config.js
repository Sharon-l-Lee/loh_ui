import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@':path.resolve(__dirname,'./src')
    }
  },
  css:{
    postcss: {
      plugins: [tailwindcss()],
    }
  }
})
