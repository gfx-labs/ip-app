import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        Pages({
            dirs: [
                { dir: 'src/splash', baseRoute: '' },
            ]
        }),
    ],
    publicDir: "./public",
    build: {
        rollupOptions: {
            input: {
                book: resolve(__dirname, "book/index.html"),
                main: resolve(__dirname, "index.html"),
            }
        }
    }
})
