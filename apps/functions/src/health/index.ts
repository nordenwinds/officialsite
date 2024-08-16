import { Hono } from 'hono';
import pkg from '../../package.json';
import { HttpStatus } from '../lib/http';
import { HealthStatus } from './status';

const app = new Hono();

const route = app.get('/', (c) => {
  return c.json(
    {
      status: HealthStatus.PASS,
      version: pkg.version,
    },
    HttpStatus.OK,
  );
});

export type HealthCheckApp = typeof route;

export default app;
