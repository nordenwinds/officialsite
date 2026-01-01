import assert from "node:assert/strict";
import { after, before, beforeEach, describe, it } from "node:test";
import { testClient } from "hono/testing";
import { Agent, MockAgent, setGlobalDispatcher } from "undici";
import { HttpStatus } from "../../lib/http.ts";
import type { ContactApp } from "./index.ts";
import contact from "./index.ts";

describe("contact", () => {
	const fakeSlackWebhookEndpoint = "https://example.com";
	const mockedFetch = new MockAgent();

	const client = testClient<ContactApp>(contact, {
		SLACK_WEBHOOK_URL: fakeSlackWebhookEndpoint,
	});

	before(() => {
		setGlobalDispatcher(mockedFetch);
		mockedFetch.disableNetConnect();
	});

	after(async () => {
		await mockedFetch.close();
		setGlobalDispatcher(new Agent());
	});

	describe("post /", () => {
		beforeEach(() => {
			// Mock request to Slack
			// NOTE: Endpoint MUST be without trailing slash.
			mockedFetch
				.get(fakeSlackWebhookEndpoint)
				.intercept({ path: /.*/, method: "POST" })
				.reply(HttpStatus.OK);
		});

		it("should return created contact", async () => {
			const req = {
				name: "John Doe",
				email: "john@example.com",
				content: "Testing.",
			};
			const res = await client.index.$post({
				json: req,
			});
			assert.equal(res.status, HttpStatus.CREATED);

			const body = await res.json();
			assert.equal(typeof body.id, "string");
			assert.partialDeepStrictEqual(body, {
				name: "John Doe",
				email: "john@example.com",
				content: "Testing.",
			});
		});
	});
});
