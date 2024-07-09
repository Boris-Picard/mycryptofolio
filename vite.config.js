import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  // Déterminer le serveur API en fonction du mode
  const apiServer = mode === 'production'
    ? import.meta.env.VITE_API_SERVER_PROD
    : import.meta.env.VITE_API_SERVER_DEV;

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
          target: apiServer,
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
