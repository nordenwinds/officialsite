import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { testClient } from "hono/testing";
import { HttpStatus } from "../lib/http.ts";
import type { HealthCheckApp } from "./index.ts";
import app from "./index.ts";
import { HealthStatus } from "./status.ts";

describe("health", () => {
	describe("get /", () => {
		it("should return ok", async () => {
			const res = await testClient<HealthCheckApp>(app).index.$get();
			assert.equal(res.status, HttpStatus.OK);

			const body = await res.json();
			assert.equal(body.status, HealthStatus.PASS);
			assert.equal(typeof body.version, "string");
		});
	});
});
