import { z } from "@hono/zod-openapi";

export const ValidationErrorSchema = z
	.object({
		type: z.string().openapi({
			example: "https://api.nordenwinds.com/error/validation-error",
		}),
		title: z.string().openapi({
			example: "Your parameters did not validate.",
		}),
		invalidParams: z
			.object({
				name: z.string().openapi({
					example: "id",
				}),
				reason: z.string().openapi({
					example: "ID must be string",
				}),
			})
			.array(),
	})
	.openapi("ValidationError");

export const NotFoundErrorSchema = z
	.object({
		type: z.string().openapi({
			example: "https://api.nordenwinds.com/error/not-found",
		}),
		title: z.string().openapi({
			example: "The endpoint you have tried to access does not exist.",
		}),
		instance: z.string().openapi({
			example: "/user/404",
		}),
	})
	.openapi("NotFoundError");

export type ValidationError = z.infer<typeof ValidationErrorSchema>;

export type NotFoundError = z.infer<typeof NotFoundErrorSchema>;
