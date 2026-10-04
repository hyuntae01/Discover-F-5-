import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// 산출물 규칙: 빌드 결과는 서버 없이 더블클릭으로 열리는 단일 HTML 한 개다.
// viteSingleFile 이 JS/CSS를 dist/index.html 안으로 모두 인라인한다.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 4096,
  },
})
