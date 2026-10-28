import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/mihrab/',
  server: {
    // AI Studio sets DISABLE_HMR=true while its agent edits files.
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
  build: {
    rollupOptions: {
      output: {
        // Split large libraries into their own cached chunks.
        manualChunks(id) { if (id.includes('node_modules')) { return 'vendor'; } },
        },
      },
    },
  },
});
