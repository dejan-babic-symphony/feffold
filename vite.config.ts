import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';

// https://vite.dev/config/
const viteConfig = defineViteConfig({
  plugins: [react(), ViteImageOptimizer()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.spec.ts', '**/*.spec.tsx'],
    exclude: [
      'automation',
      'node_modules',
      'src/main.tsx',
      'src/stories/**/*',
      'src/**/*index.ts',
      'src/vite-env.d.ts',
    ],
    setupFiles: './vitest.setup.ts',
  },
});

export default mergeConfig(viteConfig, vitestConfig);
