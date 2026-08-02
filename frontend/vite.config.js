import { defineConfig, loadEnv } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const envDir = path.resolve(root, '..')
  const env = loadEnv(mode, envDir, '')

  return {
    envDir,
    plugins: [react(), tailwindcss()],
    server: {
      port: Number(env.FRONTEND_PORT) || 5173,
      proxy: {
        '/api': env.API_PROXY || 'http://localhost:3000',
      },
    },
  }
})
