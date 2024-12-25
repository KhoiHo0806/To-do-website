import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import { defineConfig } from "vite";

// Load environment variables from .env file
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_PORT || "3000"),
  },
});
