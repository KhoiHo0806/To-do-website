import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import { defineConfig } from "vite";
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_PORT || "3000"),
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
});
