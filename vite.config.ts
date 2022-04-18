import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        hmr: (process.env.GITPOD_WORKSPACE_URL && (process.env.GITPOD_REMOTE_CLI_IPC != undefined)) ? {
            host: process.env.GITPOD_WORKSPACE_URL.replace("https://", "3000-"),
            protocol: "wss",
            clientPort: 443
        } : true
    },
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin']
            }
        }),
        Pages(),
    ],
    publicDir: "./res",
    build: {}
})
