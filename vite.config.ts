import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      name: 'FatcherMiddlewareParameter',
      formats: ['cjs', 'umd', 'es'],
      entry: ['src/index.ts'],
      fileName: format => `index.${format === 'cjs' ? '' : format === 'es' ? 'esm' : 'min'}.js`,
    },
  },
});
