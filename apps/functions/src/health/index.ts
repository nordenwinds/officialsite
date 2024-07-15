import { Hono } from 'hono';

const app = new Hono();

const route = app.get('/', (c) => {
  c.status(200);
  return c.json({
    message: 'ok',
  });
});

export type HealthCheckApp = typeof route;

export default app;
