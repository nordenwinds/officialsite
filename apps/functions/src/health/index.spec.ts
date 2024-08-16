import { describe, expect, it } from 'bun:test';
import { testClient } from 'hono/testing';
import { HttpStatus } from '../lib/http';
import app from './index';
import type { HealthCheckApp } from './index';
import { HealthStatus } from './status';

describe('health', () => {
  describe('get /', () => {
    it('should return ok', async () => {
      const res = await testClient<HealthCheckApp>(app).index.$get();
      expect(res.status).toBe(HttpStatus.OK);
      expect(await res.json()).toEqual({
        status: HealthStatus.PASS,
        version: expect.any(String),
      });
    });
  });
});
