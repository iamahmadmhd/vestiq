import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge must know the custom type sizes and font families from global.css. Otherwise it
 * reads `text-display` as a text colour and drops it next to `text-foreground` (or the reverse).
 */
const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            text: [
                'display',
                'title',
                'heading',
                'reason',
                'body',
                'button',
                'subhead',
                'caption',
                'tab',
                'data',
            ],
            font: ['sans-medium', 'sans-semibold', 'sans-bold', 'mono-medium'],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
