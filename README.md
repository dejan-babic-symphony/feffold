# Feffold

To use this scaffold as a starting point of a front-end project run

```sh
npx degit dejan-babic-symphony/feffold your-project-name
```

This will make a copy of the project with a fresh git history, so all that needs to be done to get things going is

```sh
npm i && npm run dev
```

# Feffold stack

Steps done to create this app are described bellow

## Vite React App

> Run `npm` command

```sh
npm create vite@latest
```

## Vitest

> Run `npm` command

```sh
npm install -D vitest jsdom @vitest/ui /@testing-library/react @testing-library/jest-dom @testing-library/user-event @types/react @types/react-dom @types/jest eslint-plugin-vitest
```

> Create `vitest.setup.ts`

```ts
import '@testing-library/jest-dom';
```

> Update `vitest.config.ts`

```diff
-diff --git a/vite.config.ts b/vite.config.ts
index 8b0f57b..e20977b 100644
--- a/vite.config.ts
+++ b/vite.config.ts
@@ -1 +1,2 @@
-import { defineConfig } from 'vite'
+import { defineConfig as defineViteConfig, mergeConfig } from 'vite'
+import { defineConfig as defineVitestConfig } from 'vitest/config'
@@ -5 +6 @@ import react from '@vitejs/plugin-react'
-export default defineConfig({
+const viteConfig = defineViteConfig({
@@ -6,0 +8 @@ export default defineConfig({
+
@@ -7,0 +10,10 @@ export default defineConfig({
+
+const vitestConfig = defineVitestConfig({
+  test: {
+    globals: true,
+    environment: 'jsdom',
+    setupFiles: './vitest.setup.ts'
+  },
+})
+
+export default mergeConfig(viteConfig, vitestConfig)
```

> Update `package.json`

```diff
diff --git a/package.json b/package.json
index a0f76fa..e5c750c 100644
--- a/package.json
+++ b/package.json
@@ -10 +10,3 @@
-    "preview": "vite preview"
+    "preview": "vite preview",
+    "test": "vitest run --no-isolate",
+    "test:ui": "vitest --ui --no-isolate"
@@ -18 +20,6 @@
-    "@types/react": "^18.3.17",
+    "@testing-library/dom": "^10.4.0",
+    "@testing-library/jest-dom": "^6.6.3",
+    "@testing-library/react": "^16.1.0",
+    "@testing-library/user-event": "^14.5.2",
+    "@types/jest": "^29.5.14",
+    "@types/react": "^18.3.18",
@@ -20,0 +28 @@
+    "@vitest/ui": "^2.1.8",
@@ -25,0 +35 @@
+    "jsdom": "^25.0.1",
@@ -28 +38,2 @@
-    "vite": "^6.0.3"
+    "vite": "^6.0.3",
+    "vitest": "^2.1.8"
```

> Update `tsconfig.app.json`

```diff
diff --git a/tsconfig.app.json b/tsconfig.app.json
index 358ca9b..06e8b8a 100644
--- a/tsconfig.app.json
+++ b/tsconfig.app.json
@@ -8,0 +9 @@
+    "types": ["vitest/globals", "node", "jest", "@testing-library/jest-dom"],
@@ -25 +26 @@
-  "include": ["src"]
+  "include": ["src", "src/**/*.ts", "src/**/*.tsx", "src/**/*.test.ts", "src/**/*.test.tsx"]

```

> Update `package.json`

```diff
diff --git a/package.json b/package.json
index a0f76fa..e5c750c 100644
--- a/package.json
+++ b/package.json
@@ -10 +10,3 @@
-    "preview": "vite preview"
+    "preview": "vite preview",
+    "test": "vitest run --no-isolate",
+    "test:ui": "vitest --ui --no-isolate"
```

## Commitlint

> Run `npm` command

```sh
npm install -D @commitlint/{config-conventional,cli} husky
```

> Create `commitlint.config.js`

```js
export default { extends: ['@commitlint/config-conventional'] };
```

> Run `npx` command

```sh
npx husky-init && npm i
```

> Run `npx` command

```sh
npx husky add .husky/commit-msg "npx --no -- commitlint --edit '$1'"
```

## Prettier

> Run `npm` command

```sh
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

> Create `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
```

> Create `.prettierignore`

```
node_modules/
dist/
build/
```

> Update `eslint.config.js`

```diff
diff --git a/eslint.config.js b/eslint.config.js
index 00e8ed1..1da13aa 100644
--- a/eslint.config.js
+++ b/eslint.config.js
@@ -5,0 +6 @@ import tseslint from 'typescript-eslint'
+import prettier from 'eslint-plugin-prettier'
@@ -10 +11,5 @@ export default tseslint.config(
-    extends: [js.configs.recommended, ...tseslint.configs.recommended],
+    extends: [
+      js.configs.recommended,
+      ...tseslint.configs.recommended,
+      prettier.configs.recommended
+    ],
@@ -18,0 +24 @@ export default tseslint.config(
+      'prettier': prettier
```

> Run `npm` command

```sh
npm i -D pretty-quick
```

> Run `npx` command

```sh
npx husky add .husky/pre-commit "npx pretty-quick --staged"
```

> Update `package.json`

```diff
diff --git a/package.json b/package.json
index 1806a15..278501c 100644
--- a/package.json
+++ b/package.json
@@ -13 +13,2 @@
-    "prepare": "husky install"
+    "prepare": "husky install",
+    "format": "prettier --write ."
@@ -33,0 +35,2 @@
+    "eslint-config-prettier": "^9.1.0",
+    "eslint-plugin-prettier": "^5.2.1",
@@ -38,0 +42,2 @@
+    "prettier": "^3.4.2",
+    "pretty-quick": "^4.0.0",
```

## Playwright

> Run `npm` command

```sh
npm init playwright@latest
```

> Update `vite.config.ts`

```diff
diff --git a/vite.config.ts b/vite.config.ts
index 2dfa260..311308e 100644
--- a/vite.config.ts
+++ b/vite.config.ts
@@ -11,6 +11,15 @@ const vitestConfig = defineVitestConfig({
   test: {
     globals: true,
     environment: 'jsdom',
+    include: ['**/*.spec.ts', '**/*.spec.tsx'],
+    exclude: [
+      '.automation',
+      'node_modules',
+      'src/main.tsx',
+      'src/stories/**/*',
+      'src/**/*index.ts',
+      'src/vite-env.d.ts',
+    ],
     setupFiles: './vitest.setup.ts',
   },
 });
```

## Storybook

> Run `npx` command

```sh
npx storybook@latest init
```

> Run `npm` command

```sh
npm i -D @storybook/types
```

> Update `tsconfig.app.json`

```diff
diff --git a/tsconfig.app.json b/tsconfig.app.json
index 06e8b8a..e5a40bb 100644
--- a/tsconfig.app.json
+++ b/tsconfig.app.json
@@ -9 +9 @@
-    "types": ["vitest/globals", "node", "jest", "@testing-library/jest-dom"],
+    "types": ["vitest/globals", "node", "jest", "@testing-library/jest-dom", "@storybook/types"],
```

> Create `.storybook/preview-head.html`

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
  rel="stylesheet"
/>
```

> Create `.storybook/preview.css`

```css
@import '../src/index.css';
```

> Update `.storybook/preview.ts`

```diff
diff --git a/.storybook/preview.ts b/.storybook/preview.ts
index adcda96..fe62c5c 100644
--- a/.storybook/preview.ts
+++ b/.storybook/preview.ts
@@ -1,0 +2 @@ import type { Preview } from '@storybook/react';
+import './preview.css';
```

## Tailwind

> Run `npm` command

```sh
npm install -D tailwindcss postcss autoprefixer
```

> Create `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

> Create `postcss.config.js`

```js
// postcss.config.mjs
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Update `src/index.css`

```diff
diff --git a/src/index.css b/src/index.css
index 1545f2e..d48ab1b 100644
--- a/src/index.css
+++ b/src/index.css
@@ -0,0 +1,4 @@
+@tailwind base;
+@tailwind components;
+@tailwind utilities;
+
```
