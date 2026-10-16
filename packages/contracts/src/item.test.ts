import { describe, expect, it } from 'vitest';

import { ItemAttributesSchema } from './item';

const valid = {
    category: 'outerwear',
    subcategory: 'blazer',
    primaryColor: 'navy',
    pattern: 'solid',
    material: 'wool',
    formality: 4,
    warmth: 3,
    role: 'basic',
    waterproof: false,
    seasons: ['autumn', 'winter'],
    bikeSuitable: false,
};

describe('ItemAttributesSchema', () => {
    it('accepts confirmed attributes from the taxonomy', () => {
        expect(ItemAttributesSchema.safeParse(valid).success).toBe(true);
    });

    it('rejects a subcategory from another category', () => {
        const r = ItemAttributesSchema.safeParse({ ...valid, subcategory: 'sneakers' });
        expect(r.success).toBe(false);
        expect(r.error?.issues[0]?.path).toEqual(['subcategory']);
    });

    it('rejects values outside the taxonomy', () => {
        expect(ItemAttributesSchema.safeParse({ ...valid, primaryColor: 'teal' }).success).toBe(false);
        expect(ItemAttributesSchema.safeParse({ ...valid, formality: 6 }).success).toBe(false);
    });
});
