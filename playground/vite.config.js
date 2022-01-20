import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [vue()],
})
