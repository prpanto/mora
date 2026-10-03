import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
  ],
  
  resolve: {
    tsconfigPaths: true,
    alias: [
      {
        find: "~",
        replacement: "/app",
      },
    ],
  },

  server: {
    fs: {
      allow: [".."],
    },
    proxy: {
      "/api": {
        target: "http://localhost:8000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
    },
  },
})
