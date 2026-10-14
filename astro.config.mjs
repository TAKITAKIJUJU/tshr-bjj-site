// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

import path from 'path';
import os from 'os';

// https://astro.build/config
export default defineConfig({
  site: 'https://tshr-bjj.com',
  vite: {
    plugins: [tailwindcss()],
    cacheDir: path.join(os.tmpdir(), 'vite-cache-tshr-bjj')
  },

  adapter: cloudflare()
});