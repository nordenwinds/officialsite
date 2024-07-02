import { OpenAPIHono } from '@hono/zod-openapi';
import { v4 as uuid } from 'uuid';
import type { Bindings } from '../../bindings';
import { buildMessage, sendMessage } from '../../service/slack';
import type { Contact, ContactRequest } from './contact.model';
import { postContact } from './contact.path';

const app = new OpenAPIHono<{ Bindings: Bindings }>();

const route = app.openapi(postContact, async (c) => {
  const req: ContactRequest = c.req.valid('json');
  const contact = {
    id: uuid(),
    ...req,
  } as const satisfies Contact;

  console.info('Creating new contact.', contact);

  const url = c.env.SLACK_WEBHOOK_URL;

  await sendMessage(url, {
    blocks: buildMessage('New contact was created!', contact),
  });

  c.status(201);
  return c.json(contact);
});

export type ContactApp = typeof route;

export default app;
