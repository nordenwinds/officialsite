import type { Config } from './lib/config';

export interface Bindings {
  APP_ENV: 'local' | 'dev' | 'prd';
  SLACK_WEBHOOK_URL: string;
  HONEYCOMB_API_KEY: string;
  [x: string]: unknown;
}

export type Environment = Bindings & Config;
