import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import envCompatible from "vite-plugin-env-compatible";

// https://vite.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP_",
  plugins: [envCompatible(), tailwindcss(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // พอร์ตที่เซิร์ฟเวอร์รัน (จาก server.js)
        changeOrigin: true,
        secure: false,
      },
    }
  },
  // server: {
  //   host: true, // หรือใช้ host: '0.0.0.0'
  //   port: 5173,
  // },
});
