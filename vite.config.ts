import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Emit a physical `/ar/index.html` at build time so the Arabic route works on
 * direct access / refresh on ANY static host (Hostinger/Apache, GitHub Pages,
 * …) — no server rewrite needed. It's a copy of index.html with the language
 * meta flipped to Arabic; React still reads the path at runtime to pick the UI.
 */
function emitArRoute(): Plugin {
  return {
    name: 'emit-ar-route',
    apply: 'build',
    writeBundle(options) {
      const outDir = options.dir ?? 'dist';
      const html = readFileSync(join(outDir, 'index.html'), 'utf8')
        .replace('<html lang="en">', '<html lang="ar" dir="rtl">')
        .replace('href="https://raoufalbeni.com"', 'href="https://raoufalbeni.com/ar"')
        .replace('content="https://raoufalbeni.com"', 'content="https://raoufalbeni.com/ar"')
        .replace('property="og:locale" content="en_US"', 'property="og:locale" content="ar_SY"')
        .replace(
          'property="og:locale:alternate" content="ar_SY"',
          'property="og:locale:alternate" content="en_US"'
        );
      mkdirSync(join(outDir, 'ar'), { recursive: true });
      writeFileSync(join(outDir, 'ar', 'index.html'), html);
    },
  };
}

export default defineConfig({
  plugins: [react(), emitArRoute()],
});
