import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // This should be '/' not './'
  server: {
    watch: {
      usePolling: true
    },
    port: 5173,
    host: true // This makes the server accessible from other devices
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
});