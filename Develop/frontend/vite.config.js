import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5137,
    proxy: {
      "/api": {
        target: "https://playpaddle.onrender.com",
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  plugins: [react()],
});
