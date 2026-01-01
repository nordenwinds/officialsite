import { Hono } from "hono";
import pkg from "../../package.json" with { type: "json" };
import { HttpStatus } from "../lib/http.ts";
import { HealthStatus } from "./status.ts";

const app = new Hono();

const route = app.get("/", (c) => {
	return c.json(
		{
			status: HealthStatus.PASS,
			version: pkg.version,
		},
		HttpStatus.OK,
	);
});

export type HealthCheckApp = typeof route;

export default app;
