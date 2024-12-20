# Feffold
Steps done to create this app are described in this readme

## Create vite react app
>Run `npm` command
```sh
npm create vite@latest
```
## Setup Vitest
>Run `npm` command
```sh
npm install -D vitest jsdom @vitest/ui /@testing-library/react @testing-library/jest-dom @testing-library/user-event @types/react @types/react-dom @types/jest eslint-plugin-vitest
```
>Create  `vitest.setup.ts`
```ts
import '@testing-library/jest-dom';
```
>Update  `vitest.config.ts`
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
>Update `package.json`
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
>Update `tsconfig.app.json`
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
>Update `package.json`
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
## Setup Commitlint & Husky
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




