import { OpenAPIHono } from "@hono/zod-openapi";
import { v7 as uuid } from "uuid";
import type { Bindings } from "../../bindings";
import { HttpStatus } from "../../lib/http.ts";
import { buildMessage, sendMessage } from "../../service/slack.ts";
import type { Contact, ContactRequest } from "./contact.model";
import { postContact } from "./contact.path.ts";

const app = new OpenAPIHono<{ Bindings: Bindings }>();

const route = app.openapi(postContact, async (c) => {
	const req: ContactRequest = c.req.valid("json");
	const contact = {
		id: uuid(),
		...req,
	} as const satisfies Contact;

	console.info("Creating new contact.", contact);

	const url = c.env.SLACK_WEBHOOK_URL;

	await sendMessage(url, {
		blocks: buildMessage("New contact was created!", contact),
	});

	return c.json(contact, HttpStatus.CREATED);
});

export type ContactApp = typeof route;

export default app;
