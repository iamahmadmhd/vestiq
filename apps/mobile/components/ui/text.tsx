import { cn } from '@/lib/utils';
import { Slot } from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Text as RNText, type Role } from 'react-native';

// The design system's type styles. React Native needs one font family per weight, so each style
// picks its family (font-sans-bold…) instead of a font-weight class. Text is left-aligned everywhere.
const TYPE = {
    display: 'font-sans-bold text-display',
    title: 'font-sans-bold text-title',
    heading: 'font-sans-semibold text-heading',
    reason: 'font-sans-medium text-reason',
    body: 'font-sans text-body',
    button: 'font-sans-semibold text-button',
    subhead: 'font-sans text-subhead',
    caption: 'font-sans text-caption',
    tab: 'font-sans-medium text-tab',
    data: 'font-mono-medium text-data uppercase', // facts only, never sentences
} as const;

const textVariants = cva(
    cn(
        'text-foreground',
        TYPE.body,
        Platform.select({
            web: 'select-text',
        }),
    ),
    {
        variants: {
            variant: {
                default: '',
                // Design-system names
                display: TYPE.display,
                title: TYPE.title,
                heading: TYPE.heading,
                reason: TYPE.reason,
                body: TYPE.body,
                button: TYPE.button,
                subhead: TYPE.subhead,
                caption: TYPE.caption,
                tab: TYPE.tab,
                data: TYPE.data,
                // RNR names, mapped onto the same styles
                h1: cn(TYPE.display, Platform.select({ web: 'scroll-m-20' })),
                h2: cn(TYPE.title, Platform.select({ web: 'scroll-m-20 first:mt-0' })),
                h3: cn(TYPE.heading, Platform.select({ web: 'scroll-m-20' })),
                h4: cn(TYPE.reason, Platform.select({ web: 'scroll-m-20' })),
                p: TYPE.body,
                blockquote: cn(TYPE.body, 'mt-4 border-l-2 border-border pl-3'),
                code: cn(TYPE.data, 'relative rounded-xs bg-muted px-1 py-0.5'),
                lead: cn(TYPE.reason, 'text-muted-foreground'),
                large: TYPE.button,
                small: TYPE.caption,
                muted: cn(TYPE.subhead, 'text-muted-foreground'),
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

type TextVariantProps = VariantProps<typeof textVariants>;

type TextVariant = NonNullable<TextVariantProps['variant']>;

const ROLE: Partial<Record<TextVariant, Role>> = {
    h1: 'heading',
    h2: 'heading',
    h3: 'heading',
    h4: 'heading',
    display: 'heading',
    title: 'heading',
    heading: 'heading',
    blockquote: Platform.select({ web: 'blockquote' as Role }),
    code: Platform.select({ web: 'code' as Role }),
};

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
    h1: '1',
    h2: '2',
    h3: '3',
    h4: '4',
    display: '1',
    title: '1',
    heading: '2',
};

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
    className,
    asChild = false,
    variant = 'default',
    ...props
}: React.ComponentProps<typeof RNText> &
    React.RefAttributes<typeof RNText> &
    TextVariantProps & {
        asChild?: boolean;
    }) {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot : RNText;
    return (
        <Component
            className={cn(textVariants({ variant }), textClass, className)}
            role={variant ? ROLE[variant] : undefined}
            aria-level={variant ? ARIA_LEVEL[variant] : undefined}
            {...props}
        />
    );
}

export { Text, TextClassContext };
