import { beforeEach, describe, expect, it, spyOn } from 'bun:test';
import { testClient } from 'hono/testing';
import { HttpStatus } from '../../lib/http';
import type { ContactApp } from './index';
import contact from './index';

describe('contact', () => {
  const client = testClient<ContactApp>(contact, {
    SLACK_WEBHOOK_URL: 'https://example.com/',
  });

  describe('post /', () => {
    beforeEach(() => {
      // Mock request to Slack
      spyOn(global, 'fetch').mockResolvedValue(new Response('ok'));
    });

    it('should return created contact', async () => {
      const req = {
        name: 'John Doe',
        email: 'john@example.com',
        content: 'Testing.',
      };
      const res = await client.index.$post({
        json: req,
      });
      expect(res.status).toBe(HttpStatus.CREATED);
      expect(await res.json()).toEqual({
        id: expect.any(String),
        name: 'John Doe',
        email: 'john@example.com',
        content: 'Testing.',
      });
    });
  });
});
