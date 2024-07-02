import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from 'hono';

const app = new Hono();

app.get('v1', swaggerUI({ url: '/v1/openapi.json' }));

export default app;
