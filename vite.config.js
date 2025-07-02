import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: "src/index.js",
      formats: ["es", "umd"],
      name: "DrawFootballPitchLibrary",
      fileName: (format) => {
        if (format === "es") return "index.es.js";
        if (format === "umd") return "index.umd.js";
        return `index.${format}.js`;
      },
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
