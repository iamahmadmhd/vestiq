import { HealthResponseSchema } from '@vestiq/contracts';
import { describe, expect, it } from 'vitest';

import { handler } from './health';

describe('GET /health', () => {
    it('returns ok with a version', async () => {
        const res = await handler();
        if (typeof res === 'string') throw new Error('expected a structured response');
        expect(res.statusCode).toBe(200);
        expect(HealthResponseSchema.parse(JSON.parse(res.body ?? ''))).toEqual({
            status: 'ok',
            version: 'dev',
        });
    });
});
