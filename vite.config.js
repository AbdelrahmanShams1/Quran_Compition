import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "./", // مهم جدًا على Netlify
  build: {
    outDir: "dist", // default، Netlify يرفع منه
  },
});
