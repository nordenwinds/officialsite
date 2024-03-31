import { OpenAPIHono } from '@hono/zod-openapi';
import type { Environment } from '../bindings';
import contact from './contact';

const app = new OpenAPIHono<{ Bindings: Environment }>();

app.route('/contact', contact);

// The OpenAPI documentation will be available at /spec
app.doc('/openapi.json', (c) => {
  return {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Functions of Norden Wind Ensemble official site',
    },
    servers: [
      {
        url: `${c.env.baseUrl}/v1`,
      },
    ],
  };
});

export default app;
