import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill'

import { truncate } from 'fs/promises';
import nodePolyfills from "rollup-plugin-polyfill-node";
import path from "path";
import {visualizer} from "rollup-plugin-visualizer"

// https://vitejs.dev/config/

// https://github.com/vitejs/vite/issues/1973
// on going issues with vite's global and process
export default defineConfig({
    base: "./",
    server: {
        hmr: (process.env.GITPOD_WORKSPACE_URL && (process.env.GITPOD_REMOTE_CLI_IPC)) ? {
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
        visualizer(),
        splitVendorChunkPlugin(),
    ],
    define: {
        global: 'globalThis'
    },
    publicDir: "./res",
    build: {
        rollupOptions: {
            plugins: [nodePolyfills()],
        },

    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
                GlobalsPolyfills({
                    buffer: true,
                    process: true,
                }),

            ]
        }
    }
})