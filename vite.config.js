import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserOrOrganizationSite = repositoryName?.endsWith('.github.io');
const base =
  process.env.GITHUB_ACTIONS && repositoryName && !isUserOrOrganizationSite
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
