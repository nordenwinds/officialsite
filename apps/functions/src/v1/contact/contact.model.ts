import { z } from '@hono/zod-openapi';

export const ContactSchema = z
  .object({
    id: z
      .string({ description: 'ID' })
      .uuid()
      .optional() // FIXME: .readonly()
      .openapi({
        example: '123',
      }),
    name: z.string({ description: 'Name whom create a contact' }).openapi({
      example: 'John Doe',
    }),
    email: z
      .string({ description: 'Email address whom create a contact' })
      .email()
      .openapi({
        example: 'john@example.com',
      }),
    organization: z
      .string({ description: 'Belongs whom create a contact' })
      .optional()
      .openapi({
        example: 'Example Association',
      }),
    content: z.string({ description: 'Contact text' }).openapi({
      example:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
  })
  .openapi('Contact');

export const ContactRequestSchema = ContactSchema.omit({ id: true });

export type Contact = z.infer<typeof ContactSchema>;
export type ContactRequest = z.infer<typeof ContactRequestSchema>;
