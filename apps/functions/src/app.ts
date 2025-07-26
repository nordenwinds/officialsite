import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import type { Environment } from './bindings';
import { ErrorTypePrefix } from './error/error.const';
import type { NotFoundError, ValidationError } from './error/error.model';
import healthCheck from './health';
import { HttpStatus } from './lib/http';
import spec from './spec';
import v1 from './v1';

const app = new OpenAPIHono<{ Bindings: Environment }>({
  defaultHook: (result, c) => {
    if (result.success) {
      return;
    }

    console.debug('Validation Error.', result.error);

    const res = {
      type: `${ErrorTypePrefix}/validation-failed`,
      title: 'Your parameters did not validate.',
      invalidParams: result.error.issues.map((err) => ({
        name: err.code,
        reason: err.message,
      })),
    } as const satisfies ValidationError;

    c.header('Content-Type', 'application/problem+json; charset=UTF-8');
    c.status(HttpStatus.BAD_REQUEST);
    return c.body(JSON.stringify(res));
  },
});

app.use(logger());
app.use(secureHeaders());

app.use(
  cors({
    origin: (origin, c) =>
      c.env.cors.origins.map((org: string) =>
        origin.endsWith(org) ? origin : org,
      ),
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    maxAge: 600,
  }),
);

app.options((c) => {
  c.status(HttpStatus.NO_CONTENT);
  return c.body(null);
});

app.notFound((c) => {
  const res = {
    type: `${ErrorTypePrefix}/not-found`,
    title: 'The endpoint you have tried to access does not exist.',
    instance: c.req.path,
  } as const satisfies NotFoundError;

  c.header('Content-Type', 'application/problem+json; charset=UTF-8');
  c.status(HttpStatus.NOT_FOUND);
  return c.body(JSON.stringify(res));
});

app.route('/health', healthCheck);
app.route('/spec', spec);
app.route('/v1', v1);

export default app;
