// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///home/krivopuskkv/vue/sed_frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///home/krivopuskkv/vue/sed_frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import progress from "file:///home/krivopuskkv/vue/sed_frontend/node_modules/vite-plugin-progress/dist/index.mjs";
import TurboConsole from "file:///home/krivopuskkv/vue/sed_frontend/node_modules/unplugin-turbo-console/dist/vite.mjs";
import vueDevTools from "file:///home/krivopuskkv/vue/sed_frontend/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///home/krivopuskkv/vue/sed_frontend/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    progress(),
    TurboConsole(),
    vueDevTools()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    }
  },
  resolve: {
    alias: {
      "@/plugins": fileURLToPath(new URL("./plugins", __vite_injected_original_import_meta_url)),
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "@common": fileURLToPath(new URL("./src/common", __vite_injected_original_import_meta_url)),
      "@documents": fileURLToPath(new URL("./src/documents", __vite_injected_original_import_meta_url)),
      "@documents/directive": fileURLToPath(new URL("./src/documents/directive", __vite_injected_original_import_meta_url)),
      "@documents/esz": fileURLToPath(new URL("./src/documents/esz", __vite_injected_original_import_meta_url)),
      "@documents/review": fileURLToPath(new URL("./src/documents/review", __vite_injected_original_import_meta_url)),
      "@document-routes": fileURLToPath(new URL("./src/document-routes", __vite_injected_original_import_meta_url)),
      "@report": fileURLToPath(new URL("./src/report", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
          }
          return `${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        manualChunks: () => "index.js"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9rcml2b3B1c2trdi92dWUvc2VkX2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9rcml2b3B1c2trdi92dWUvc2VkX2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2tyaXZvcHVza2t2L3Z1ZS9zZWRfZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCBwcm9ncmVzcyBmcm9tICd2aXRlLXBsdWdpbi1wcm9ncmVzcyc7XHJcbmltcG9ydCBUdXJib0NvbnNvbGUgZnJvbSAndW5wbHVnaW4tdHVyYm8tY29uc29sZS92aXRlJztcclxuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblx0cGx1Z2luczogW1xyXG5cdFx0dnVlKCksXHJcblx0XHRwcm9ncmVzcygpLFxyXG5cdFx0VHVyYm9Db25zb2xlKCksXHJcblx0XHR2dWVEZXZUb29scygpLFxyXG5cdF0sXHJcblx0Y3NzOiB7XHJcblx0XHRwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcblx0XHRcdHNjc3M6IHtcclxuXHRcdFx0XHRhcGk6ICdtb2Rlcm4tY29tcGlsZXInLFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRyZXNvbHZlOiB7XHJcblx0XHRhbGlhczoge1xyXG5cdFx0XHQnQC9wbHVnaW5zJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3BsdWdpbnMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuXHJcblx0XHRcdCdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG5cdFx0XHQnQGNvbW1vbic6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvY29tbW9uJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcblxyXG5cdFx0XHQnQGRvY3VtZW50cyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvZG9jdW1lbnRzJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcblx0XHRcdCdAZG9jdW1lbnRzL2RpcmVjdGl2ZSc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvZG9jdW1lbnRzL2RpcmVjdGl2ZScsIGltcG9ydC5tZXRhLnVybCkpLFxyXG5cdFx0XHQnQGRvY3VtZW50cy9lc3onOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL2RvY3VtZW50cy9lc3onLCBpbXBvcnQubWV0YS51cmwpKSxcclxuXHRcdFx0J0Bkb2N1bWVudHMvcmV2aWV3JzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9kb2N1bWVudHMvcmV2aWV3JywgaW1wb3J0Lm1ldGEudXJsKSksXHJcblxyXG5cdFx0XHQnQGRvY3VtZW50LXJvdXRlcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvZG9jdW1lbnQtcm91dGVzJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcblxyXG5cdFx0XHQnQHJlcG9ydCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvcmVwb3J0JywgaW1wb3J0Lm1ldGEudXJsKSksXHJcblx0XHR9XHJcblx0fSxcclxuXHRidWlsZDoge1xyXG5cdFx0Y3NzQ29kZVNwbGl0OiBmYWxzZSxcclxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcclxuXHRcdFx0b3V0cHV0OiB7XHJcblx0XHRcdFx0YXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcclxuXHRcdFx0XHRcdGxldCBleHRUeXBlID0gYXNzZXRJbmZvLm5hbWUuc3BsaXQoJy4nKS5hdCgxKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoL3BuZ3xqcGU/Z3xzdmd8Z2lmfHRpZmZ8Ym1wfGljby9pLnRlc3QoZXh0VHlwZSkpIHtcclxuXHRcdFx0XHRcdFx0ZXh0VHlwZSA9ICdpbWFnZXMnO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiBgJHtleHRUeXBlfS9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdYDtcclxuXHRcdFx0XHR9LFxyXG5cclxuXHRcdFx0XHRjaHVua0ZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG5cclxuXHRcdFx0XHRlbnRyeUZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG5cdFx0XHRcdG1hbnVhbENodW5rczogKCkgPT4gJ2luZGV4LmpzJyxcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1IsU0FBUyxlQUFlLFdBQVc7QUFDM1QsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sY0FBYztBQUNyQixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGlCQUFpQjtBQUxvSixJQUFNLDJDQUEyQztBQVE3TixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUixJQUFJO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZO0FBQUEsRUFDYjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0oscUJBQXFCO0FBQUEsTUFDcEIsTUFBTTtBQUFBLFFBQ0wsS0FBSztBQUFBLE1BQ047QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sYUFBYSxjQUFjLElBQUksSUFBSSxhQUFhLHdDQUFlLENBQUM7QUFBQSxNQUVoRSxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3BELFdBQVcsY0FBYyxJQUFJLElBQUksZ0JBQWdCLHdDQUFlLENBQUM7QUFBQSxNQUVqRSxjQUFjLGNBQWMsSUFBSSxJQUFJLG1CQUFtQix3Q0FBZSxDQUFDO0FBQUEsTUFDdkUsd0JBQXdCLGNBQWMsSUFBSSxJQUFJLDZCQUE2Qix3Q0FBZSxDQUFDO0FBQUEsTUFDM0Ysa0JBQWtCLGNBQWMsSUFBSSxJQUFJLHVCQUF1Qix3Q0FBZSxDQUFDO0FBQUEsTUFDL0UscUJBQXFCLGNBQWMsSUFBSSxJQUFJLDBCQUEwQix3Q0FBZSxDQUFDO0FBQUEsTUFFckYsb0JBQW9CLGNBQWMsSUFBSSxJQUFJLHlCQUF5Qix3Q0FBZSxDQUFDO0FBQUEsTUFFbkYsV0FBVyxjQUFjLElBQUksSUFBSSxnQkFBZ0Isd0NBQWUsQ0FBQztBQUFBLElBQ2xFO0FBQUEsRUFDRDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ04sY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLE1BQ2QsUUFBUTtBQUFBLFFBQ1AsZ0JBQWdCLENBQUMsY0FBYztBQUM5QixjQUFJLFVBQVUsVUFBVSxLQUFLLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQztBQUU1QyxjQUFJLGtDQUFrQyxLQUFLLE9BQU8sR0FBRztBQUNwRCxzQkFBVTtBQUFBLFVBQ1g7QUFFQSxpQkFBTyxHQUFHLE9BQU87QUFBQSxRQUNsQjtBQUFBLFFBRUEsZ0JBQWdCO0FBQUEsUUFFaEIsZ0JBQWdCO0FBQUEsUUFDaEIsY0FBYyxNQUFNO0FBQUEsTUFDckI7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
