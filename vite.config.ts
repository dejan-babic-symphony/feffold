import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
const viteConfig = defineViteConfig({
  plugins: [react()],
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
