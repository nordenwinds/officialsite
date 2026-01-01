import { createRoute } from "@hono/zod-openapi";
import { ValidationErrorSchema } from "../../error/error.model.ts";
import { ContactRequestSchema, ContactSchema } from "./contact.model.ts";

const contactTag = "Contact";

export const postContact = createRoute({
	operationId: "postContact",
	summary: "Create a contact.",
	tags: [contactTag],
	method: "post",
	path: "/",
	request: {
		body: {
			required: true,
			description: "Contact",
			content: {
				"application/json": {
					schema: ContactRequestSchema,
				},
			},
		},
	},
	responses: {
		201: {
			content: {
				"application/json": {
					schema: ContactSchema,
				},
			},
			description: "Created",
		},
		400: {
			content: {
				"application/problem+json": {
					schema: ValidationErrorSchema,
				},
			},
			description: "Validation Error",
		},
	},
});
