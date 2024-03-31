import type { Config } from './lib/config';

export interface Bindings {
  APP_ENV: 'local' | 'dev' | 'prd';
  SLACK_WEBHOOK_URL: string;
  [x: string]: unknown;
}

export type Environment = Bindings & Config;
