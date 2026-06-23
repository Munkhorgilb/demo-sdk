/**
 * rn-erxes-sdk test harness
 * https://github.com/erxes/rn-erxes-sdk
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { RootStackParamList } from './src/navigation';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Home only hosts the native chat modal — it has no UI of its own.
              Hide its header and give it a dark background so the brief moment
              it's uncovered (while the chat dismisses / re-presents during
              navigation) blends into the chat instead of flashing a white
              "Home" screen. */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              contentStyle: { backgroundColor: '#000' },
            }}
          />
          {/* No slide animation: the chat is a native modal *above* the RN
              tree, so navigating already cross-dissolves through the chat
              presenting/dismissing. Letting RN also slide stacks two
              transitions back-to-back (the ~1s gap) and makes `isFocused`
              lag until the slide ends. `animation: 'none'` switches the RN
              screen instantly so the chat's fade is the only motion. */}
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ animation: 'none' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
