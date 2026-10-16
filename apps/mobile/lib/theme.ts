import { DarkTheme, DefaultTheme, type Theme } from 'expo-router/react-navigation';

/**
 * The same tokens as global.css, for places that need a plain value instead of a class
 * (React Navigation headers, StatusBar, native props). Keep the two in sync; TOKENS.md lists them.
 */
export const THEME = {
    light: {
        background: '#FFFFFF', // wall
        foreground: '#111111', // ink
        card: '#FFFFFF', // wall-raised
        cardForeground: '#111111',
        popover: '#FFFFFF',
        popoverForeground: '#111111',
        primary: '#111111', // ink
        primaryForeground: '#FFFFFF', // on-ink
        secondary: '#EFEFEC', // plinth
        secondaryForeground: '#111111',
        muted: '#EFEFEC', // plinth
        mutedForeground: '#5E5E5A', // graphite
        accent: '#EFEFEC', // plinth
        accentForeground: '#111111',
        destructive: '#B3261E', // danger
        destructiveForeground: '#FFFFFF',
        border: '#E2E2DE', // line
        input: '#8C8C88', // edge
        ring: '#111111', // focus
        radius: '8px',
        sun: '#F2A23A',
        onSun: '#111111',
        amber: '#8A4A00',
        amberSoft: '#FFF1DD',
        dangerSoft: '#FDE7E5',
        scrim: 'rgba(17, 17, 17, 0.32)',
    },
    dark: {
        background: '#0F0F0E',
        foreground: '#F3F2EE',
        card: '#1A1A18',
        cardForeground: '#F3F2EE',
        popover: '#1A1A18',
        popoverForeground: '#F3F2EE',
        primary: '#F3F2EE',
        primaryForeground: '#111111',
        secondary: '#262624',
        secondaryForeground: '#F3F2EE',
        muted: '#262624',
        mutedForeground: '#A6A59F',
        accent: '#262624',
        accentForeground: '#F3F2EE',
        destructive: '#FF8A80',
        destructiveForeground: '#111111',
        border: '#2E2E2B',
        input: '#75746E',
        ring: '#F3F2EE',
        radius: '8px',
        sun: '#F2A23A',
        onSun: '#111111',
        amber: '#F5B85C',
        amberSoft: '#33240F',
        dangerSoft: '#3A1614',
        scrim: 'rgba(0, 0, 0, 0.56)',
    },
};

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
    light: {
        ...DefaultTheme,
        colors: {
            background: THEME.light.background,
            border: THEME.light.border,
            card: THEME.light.card,
            notification: THEME.light.destructive,
            primary: THEME.light.primary,
            text: THEME.light.foreground,
        },
    },
    dark: {
        ...DarkTheme,
        colors: {
            background: THEME.dark.background,
            border: THEME.dark.border,
            card: THEME.dark.card,
            notification: THEME.dark.destructive,
            primary: THEME.dark.primary,
            text: THEME.dark.foreground,
        },
    },
};
