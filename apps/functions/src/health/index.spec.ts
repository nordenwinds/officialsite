import { describe, expect, it } from 'bun:test';
import { testClient } from 'hono/testing';
import app from './index';
import type { HealthCheckApp } from './index';

describe('health', () => {
  describe('get /', () => {
    it('should return ok', async () => {
      const res = await testClient<HealthCheckApp>(app).index.$get();
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ message: 'ok' });
    });
  });
});
