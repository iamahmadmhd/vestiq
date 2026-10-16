import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { Uniwind, useUniwind } from 'uniwind';

const SCREEN_OPTIONS = {
    title: 'Vestiq',
    headerTransparent: true,
    headerRight: () => <ThemeToggle />,
};

// Placeholder home screen: proves the app renders React Native Reusables components
// and imports @vestiq/domain from the workspace. Real screens arrive in roadmap step 6.
export default function Screen() {
    return (
        <>
            <Stack.Screen options={SCREEN_OPTIONS} />
            <View className='flex-1 items-center justify-center gap-6 p-6'>
                <Text variant='h1'>Vestiq</Text>
                <Text className='text-muted-foreground text-center'>Your wardrobe</Text>
                <Button>
                    <Text>Ask for a look</Text>
                </Button>
                <Button variant='secondary'>
                    <Text>Ask for a look</Text>
                </Button>
                <Button variant='outline'>
                    <Text>Ask for a look</Text>
                </Button>
                <Button variant='ghost'>
                    <Text>Ask for a look</Text>
                </Button>
                <Button variant='destructive'>
                    <Text>Ask for a look</Text>
                </Button>
                <Button variant='link'>
                    <Text>Ask for a look</Text>
                </Button>
            </View>
        </>
    );
}

const THEME_ICONS = {
    light: SunIcon,
    dark: MoonStarIcon,
};

function ThemeToggle() {
    const { theme } = useUniwind();

    function toggleTheme() {
        Uniwind.setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <Button
            onPressIn={toggleTheme}
            size='icon'
            variant='ghost'
            className='rounded-full ios:size-9 web:mx-4'
        >
            <Icon as={THEME_ICONS[theme ?? 'light']} className='size-5' />
        </Button>
    );
}
