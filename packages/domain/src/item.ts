import type {
    Category,
    Color,
    Fit,
    Formality,
    Material,
    Pattern,
    Role,
    Season,
    Subcategory,
    Warmth,
} from './taxonomy';
import { FORMALITY_LABELS } from './taxonomy';

/** The attributes a user confirms on the review screen. */
export interface ItemAttributes {
    category: Category;
    subcategory: Subcategory;
    primaryColor: Color;
    secondaryColor?: Color;
    pattern: Pattern;
    material: Material;
    formality: Formality;
    warmth: Warmth;
    role: Role;
    fit?: Fit;
    waterproof: boolean;
    seasons: Season[];
    bikeSuitable: boolean;
}

/**
 * The text half of the fused embedding: built only from user-confirmed attributes,
 * so a correction changes the vector. Order is fixed so equal attributes give equal text.
 * Example: "navy and white striped cotton shirt, smart casual, basic, regular fit".
 */
export function describeItem(a: ItemAttributes): string {
    const colors = a.secondaryColor ? `${a.primaryColor} and ${a.secondaryColor}` : a.primaryColor;
    const pattern = a.pattern === 'solid' ? '' : `${a.pattern} `;
    const parts = [
        `${colors} ${pattern}${a.material} ${a.subcategory}`,
        FORMALITY_LABELS[a.formality],
        a.role,
    ];
    if (a.fit) parts.push(`${a.fit} fit`);
    if (a.waterproof) parts.push('waterproof');
    return parts.join(', ');
}

/**
 * Stable hash of the confirmed attributes. Stored next to the fused vector; a mismatch
 * means the vector is stale and must be re-embedded.
 */
export function attributesHash(a: ItemAttributes): string {
    const canonical = JSON.stringify(
        Object.keys(a)
            .sort()
            .map((k) => [k, k === 'seasons' ? [...a.seasons].sort() : a[k as keyof ItemAttributes]]),
    );
    // FNV-1a, 32-bit: enough to detect change, not a security hash.
    let h = 0x811c9dc5;
    for (let i = 0; i < canonical.length; i++) {
        h ^= canonical.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16).padStart(8, '0');
}
