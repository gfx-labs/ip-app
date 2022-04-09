import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        Pages(),
    ],
    publicDir: "./public",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
            }
        }
    }
})
