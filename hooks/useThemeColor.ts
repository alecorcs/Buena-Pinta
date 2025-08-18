import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export const useThemeColor = () => {
    const colorScheme = useColorScheme();

    const isDarkIcon = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
    const isDarkView = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
    const isDarkText = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
    const isDarkActiveDrawer = colorScheme === 'dark' ? Colors.dark.activeDrawer : Colors.light.activeDrawer;
    const isDarkFloatButton = colorScheme === 'dark' ? Colors.light.text : Colors.dark.text;
    return {
        isDarkIcon,
        isDarkView,
        isDarkText,
        isDarkActiveDrawer,
        isDarkFloatButton
    };
}

