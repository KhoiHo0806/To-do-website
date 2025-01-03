import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "vite";

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
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@configs": path.resolve(__dirname, "./src/config.ts"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@protected": path.resolve(__dirname, "./src/protected"),
      "@customHooks": path.resolve(__dirname, "./src/customHooks"),
    },
  },
});
