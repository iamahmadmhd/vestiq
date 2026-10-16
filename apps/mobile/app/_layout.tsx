import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { JetBrainsMono_400Regular, JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono';
import {
    SchibstedGrotesk_400Regular,
    SchibstedGrotesk_500Medium,
    SchibstedGrotesk_600SemiBold,
    SchibstedGrotesk_700Bold,
} from '@expo-google-fonts/schibsted-grotesk';
import { PortalHost } from '@rn-primitives/portal';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'expo-router/react-navigation';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useUniwind } from 'uniwind';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

// Keep the splash screen up until the fonts are registered, so text never flashes in the system font.
SplashScreen.preventAutoHideAsync();

// The keys are the family names global.css refers to (--font-sans, --font-sans-medium, …).
const FONTS = {
    SchibstedGrotesk_400Regular,
    SchibstedGrotesk_500Medium,
    SchibstedGrotesk_600SemiBold,
    SchibstedGrotesk_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
};

export default function RootLayout() {
    const { theme } = useUniwind();
    const [loaded, error] = useFonts(FONTS);

    React.useEffect(() => {
        // On a load error, fall back to the system font rather than block the app.
        if (loaded || error) SplashScreen.hideAsync();
    }, [loaded, error]);

    if (!loaded && !error) return null;

    return (
        <ThemeProvider value={NAV_THEME[theme ?? 'light']}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            <Stack />
            <PortalHost />
        </ThemeProvider>
    );
}
