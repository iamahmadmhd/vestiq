import { z } from 'zod';

/** Stable error codes the app maps to localized messages. */
export const ERROR_CODES = [
    'validation_failed',
    'unauthorized',
    'item_not_found',
    'look_not_found',
    'wardrobe_incomplete',
    'rate_limited',
    'internal_error',
] as const;
export type ErrorCode = (typeof ERROR_CODES)[number];

/** RFC 9457 error details, with a stable `code`. */
export const ErrorSchema = z.object({
    type: z.string().default('about:blank'),
    title: z.string(),
    status: z.number().int(),
    detail: z.string().optional(),
    code: z.enum(ERROR_CODES),
    errors: z.array(z.object({ path: z.string(), message: z.string() })).optional(),
});
export type Error = z.infer<typeof ErrorSchema>;

export const HealthResponseSchema = z.object({ status: z.literal('ok'), version: z.string() });
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
