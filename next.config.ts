import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import { NextConfig } from 'next';

if (process.env.NODE_ENV === 'development') {
  setupDevPlatform();
}

const config: NextConfig = {
  webpack: config => {
    config.externals.push('pino-pretty');
    return config;
  },
};

export default config;
