import { Hono } from 'hono';
import { HttpStatus } from '../lib/http';

const app = new Hono();

const route = app.get('/', (c) => {
  return c.json(
    {
      message: 'ok',
    },
    HttpStatus.OK,
  );
});

export type HealthCheckApp = typeof route;

export default app;
