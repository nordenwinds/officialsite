import fs from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import app from "../src/v1/index.ts";

const main = async () => {
	const { positionals: argv } = parseArgs({ allowPositionals: true });
	const stdout = 1;
	const dest = argv[0] ? resolve(argv[0]) : stdout;

	// OpenAPI JSON
	const docs = app.getOpenAPIDocument({
		openapi: "3.0.0",
		info: {
			version: "1.0.0",
			title: "",
		},
	});

	fs.writeFileSync(dest, JSON.stringify(docs, null, 2));
};

main();
