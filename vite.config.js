import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: import.meta.env.VITE_API_SERVER,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      outDir: "dist",
    },
  };
});
