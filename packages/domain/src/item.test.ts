import { describe, expect, it } from 'vitest';

import type { ItemAttributes } from './item';
import { attributesHash, describeItem } from './item';
import { CATEGORIES, SUBCATEGORIES, isSubcategoryOf } from './taxonomy';

const shirt: ItemAttributes = {
    category: 'tops',
    subcategory: 'shirt',
    primaryColor: 'navy',
    secondaryColor: 'white',
    pattern: 'striped',
    material: 'cotton',
    formality: 3,
    warmth: 2,
    role: 'basic',
    fit: 'regular',
    waterproof: false,
    seasons: ['spring', 'summer'],
    bikeSuitable: true,
};

describe('describeItem', () => {
    it('builds the embedding text from confirmed attributes', () => {
        expect(describeItem(shirt)).toBe(
            'navy and white striped cotton shirt, smart casual, basic, regular fit',
        );
    });

    it('omits the pattern word for solid items', () => {
        expect(describeItem({ ...shirt, pattern: 'solid', secondaryColor: undefined, fit: undefined })).toBe(
            'navy cotton shirt, smart casual, basic',
        );
    });
});

describe('attributesHash', () => {
    it('is stable regardless of key and season order', () => {
        const reordered = { ...shirt, seasons: ['summer', 'spring'] } as ItemAttributes;
        expect(attributesHash(reordered)).toBe(attributesHash(shirt));
    });

    it('changes when the user corrects an attribute', () => {
        expect(attributesHash({ ...shirt, primaryColor: 'black' })).not.toBe(attributesHash(shirt));
    });
});

describe('taxonomy', () => {
    it('has subcategories for every category', () => {
        for (const c of CATEGORIES) expect(SUBCATEGORIES[c].length).toBeGreaterThan(0);
    });

    it('checks subcategory membership', () => {
        expect(isSubcategoryOf('shoes', 'sneakers')).toBe(true);
        expect(isSubcategoryOf('shoes', 'blazer')).toBe(false);
    });
});
