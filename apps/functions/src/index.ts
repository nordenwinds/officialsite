import { instrument, type ResolveConfigFn } from "@microlabs/otel-cf-workers";
import app from "./app.ts";
import type { Bindings, Environment } from "./bindings";
import { config } from "./config";

const handler = {
	async fetch(req, env, ctx): Promise<Response> {
		return app.fetch(req, { ...env, ...config[env.APP_ENV] }, ctx);
	},
} satisfies ExportedHandler<Environment>;

const o11yConfig: ResolveConfigFn = (env: Bindings, _trigger) => {
	const conf = config[env.APP_ENV];

	return {
		exporter: {
			url: conf.otel.exporter.url,
			headers: {
				"x-honeycomb-team": env.HONEYCOMB_API_KEY,
			},
		},
		service: {
			name: conf.otel.service.name,
		},
	};
};

export default instrument(handler, o11yConfig);
