import type { Config, Environment } from './lib/config';

export const config: Record<Environment, Config> = {
  local: {
    name: 'local',
    baseUrl: 'http://localhost:8080',
    cors: {
      origins: ['*'],
    },
    otel: {
      exporter: {
        url: 'https://api.honeycomb.io/v1/traces',
      },
      service: {
        name: 'functions',
      },
    },
  },
  dev: {
    name: 'develop',
    baseUrl: 'http://api-dev.nordenwinds.com',
    cors: {
      origins: ['nordenwinds.pages.dev'],
    },
    otel: {
      exporter: {
        url: 'https://api.honeycomb.io/v1/traces',
      },
      service: {
        name: 'functions',
      },
    },
  },
  prd: {
    name: 'production',
    baseUrl: 'http://api.nordenwinds.com',
    cors: {
      origins: ['www.nordenwinds.com'],
    },
    otel: {
      exporter: {
        url: 'https://api.honeycomb.io/v1/traces',
      },
      service: {
        name: 'functions',
      },
    },
  },
};
