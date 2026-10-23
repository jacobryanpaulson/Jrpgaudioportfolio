import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserOrOrganizationSite = repositoryName?.endsWith('.github.io');
const hasCustomDomain = existsSync(new URL('./CNAME', import.meta.url));
const base =
  process.env.GITHUB_ACTIONS && repositoryName && !isUserOrOrganizationSite && !hasCustomDomain
    ? `/${repositoryName}/`
    : '/';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
