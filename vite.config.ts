
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: "/testlab/",
  plugins: [react()],
  define: {
    // Standard way to shim process for browser-based libraries like @google/genai
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY || '')
    },
    'process.platform': JSON.stringify('browser'),
    'process.version': JSON.stringify('')
  },
  server: {
    host: true,
    port: 3000
  }
});
