/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/contact": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create a contact. */
        post: operations["postContact"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Contact: {
            /**
             * Format: uuid
             * @description ID
             * @example 123
             */
            id?: string;
            /**
             * @description Name whom create a contact
             * @example John Doe
             */
            name: string;
            /**
             * Format: email
             * @description Email address whom create a contact
             * @example john@example.com
             */
            email: string;
            /**
             * @description Belongs whom create a contact
             * @example Example Association
             */
            organization?: string;
            /**
             * @description Contact text
             * @example Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
             */
            content: string;
        };
        ValidationError: {
            /** @example https://api.nordenwinds.com/error/validation-error */
            type: string;
            /** @example Your parameters did not validate. */
            title: string;
            invalidParams: {
                /** @example id */
                name: string;
                /** @example ID must be string */
                reason: string;
            }[];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    postContact: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Contact */
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * @description Name whom create a contact
                     * @example John Doe
                     */
                    name: string;
                    /**
                     * Format: email
                     * @description Email address whom create a contact
                     * @example john@example.com
                     */
                    email: string;
                    /**
                     * @description Belongs whom create a contact
                     * @example Example Association
                     */
                    organization?: string;
                    /**
                     * @description Contact text
                     * @example Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                     */
                    content: string;
                };
            };
        };
        responses: {
            /** @description Created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Contact"];
                };
            };
            /** @description Validation Error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/problem+json": components["schemas"]["ValidationError"];
                };
            };
        };
    };
}
