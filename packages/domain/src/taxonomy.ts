/**
 * The womenswear taxonomy: the only values recognition may return, the user may pick,
 * and the look engine reasons about. Bump TAXONOMY_VERSION on any change; the
 * recognize tool schema and stored attributeMeta record it.
 */
export const TAXONOMY_VERSION = 1;

export const CATEGORIES = ['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'bags', 'scarves'] as const;
export type Category = (typeof CATEGORIES)[number];

export const SUBCATEGORIES = {
    tops: ['t-shirt', 'shirt', 'blouse', 'polo', 'sweater', 'cardigan', 'sweatshirt', 'tank top', 'vest'],
    bottoms: ['jeans', 'trousers', 'chinos', 'shorts', 'skirt', 'leggings'],
    dresses: ['day dress', 'shirt dress', 'evening dress', 'jumpsuit'],
    outerwear: ['blazer', 'jacket', 'coat', 'trench coat', 'raincoat', 'puffer'],
    shoes: ['sneakers', 'loafers', 'flats', 'heels', 'boots', 'ankle boots', 'sandals'],
    bags: ['tote', 'shoulder bag', 'crossbody', 'clutch', 'backpack'],
    scarves: ['light scarf', 'wool scarf'],
} as const satisfies Record<Category, readonly string[]>;
export type Subcategory = (typeof SUBCATEGORIES)[Category][number];

export const COLORS = [
    'black',
    'white',
    'grey',
    'beige',
    'brown',
    'navy',
    'blue',
    'light blue',
    'green',
    'olive',
    'red',
    'burgundy',
    'pink',
    'purple',
    'yellow',
    'orange',
] as const;
export type Color = (typeof COLORS)[number];

/** Neutrals combine with anything; the harmony rule allows at most one non-neutral color family. */
export const NEUTRAL_COLORS: readonly Color[] = ['black', 'white', 'grey', 'beige', 'brown', 'navy'];

export const PATTERNS = [
    'solid',
    'striped',
    'checked',
    'dotted',
    'floral',
    'animal print',
    'graphic print',
] as const;
export type Pattern = (typeof PATTERNS)[number];

export const MATERIALS = [
    'cotton',
    'denim',
    'wool',
    'knit',
    'leather',
    'silk',
    'linen',
    'synthetic',
] as const;
export type Material = (typeof MATERIALS)[number];

export const FITS = ['slim', 'regular', 'relaxed', 'oversized'] as const;
export type Fit = (typeof FITS)[number];

export const ROLES = ['basic', 'statement'] as const;
export type Role = (typeof ROLES)[number];

export const SEASONS = ['spring', 'summer', 'autumn', 'winter'] as const;
export type Season = (typeof SEASONS)[number];

/** 1 very casual … 5 formal evening */
export const FORMALITY_LABELS = {
    1: 'very casual',
    2: 'casual',
    3: 'smart casual',
    4: 'business',
    5: 'formal',
} as const;
export type Formality = keyof typeof FORMALITY_LABELS;

/** 1 very light summer … 5 very warm winter */
export const WARMTH_LABELS = {
    1: 'very light',
    2: 'light',
    3: 'medium-weight',
    4: 'warm',
    5: 'very warm',
} as const;
export type Warmth = keyof typeof WARMTH_LABELS;

export const ITEM_STATUSES = ['available', 'laundry', 'stored', 'archived'] as const;
export type ItemStatus = (typeof ITEM_STATUSES)[number];

export const ITEM_STATES = [
    'processing',
    'ready_for_review',
    'embedding',
    'ready',
    'rejected',
    'failed',
] as const;
export type ItemState = (typeof ITEM_STATES)[number];

export function isSubcategoryOf(category: Category, subcategory: string): subcategory is Subcategory {
    return (SUBCATEGORIES[category] as readonly string[]).includes(subcategory);
}
