import {
    CATEGORIES,
    COLORS,
    FITS,
    ITEM_STATES,
    ITEM_STATUSES,
    MATERIALS,
    PATTERNS,
    ROLES,
    SEASONS,
    isSubcategoryOf,
} from '@vestiq/domain';
import { z } from 'zod';

const ordinal = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]);

/** Attributes the user confirms. The subcategory must belong to the category. */
export const ItemAttributesSchema = z
    .object({
        category: z.enum(CATEGORIES),
        subcategory: z.string(),
        primaryColor: z.enum(COLORS),
        secondaryColor: z.enum(COLORS).optional(),
        pattern: z.enum(PATTERNS),
        material: z.enum(MATERIALS),
        formality: ordinal,
        warmth: ordinal,
        role: z.enum(ROLES),
        fit: z.enum(FITS).optional(),
        waterproof: z.boolean(),
        seasons: z.array(z.enum(SEASONS)).min(1),
        bikeSuitable: z.boolean(),
    })
    .refine((a) => isSubcategoryOf(a.category, a.subcategory), {
        path: ['subcategory'],
        message: 'Subcategory does not belong to the category',
    });

export type ItemAttributesInput = z.infer<typeof ItemAttributesSchema>;

export const ItemStatusSchema = z.enum(ITEM_STATUSES);
export const ItemStateSchema = z.enum(ITEM_STATES);

export const ConfirmItemRequestSchema = z.object({ attributes: ItemAttributesSchema });
export const UpdateItemStatusRequestSchema = z.object({ status: ItemStatusSchema });
