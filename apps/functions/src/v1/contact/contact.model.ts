import { z } from "@hono/zod-openapi";

export const ContactSchema = z
	.object({
		id: z
			.string()
			.uuid()
			.optional() // FIXME: .readonly()
			.openapi({
				description: "ID",
				example: "123",
			}),
		name: z.string().openapi({
			description: "Name whom create a contact",
			example: "John Doe",
		}),
		email: z.string().email().openapi({
			description: "Email address whom create a contact",
			example: "john@example.com",
		}),
		organization: z.string().optional().openapi({
			description: "Belongs whom create a contact",
			example: "Example Association",
		}),
		content: z.string().openapi({
			description: "Contact text",
			example:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
		}),
	})
	.openapi("Contact");

export const ContactRequestSchema = ContactSchema.omit({ id: true });

export type Contact = z.infer<typeof ContactSchema>;
export type ContactRequest = z.infer<typeof ContactRequestSchema>;
