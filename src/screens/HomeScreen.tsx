import { useIsFocused } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ErxesMessenger } from 'rn-erxes-sdk';
import type { RootStackParamList, UserProfile } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Public test credentials from the erxes-ios-sdk example app:
// https://github.com/erxes/erxes-ios-sdk/tree/main/Example
const INTEGRATION_ID = '9S6seo9wawN6cou8v';
const ENDPOINT = 'https://officenext.erxes.io';

// The signed-in user. Forwarded to the messenger as `user` and to the Profile
// screen when the avatar action is tapped.
const CURRENT_USER: UserProfile = {
  name: 'Munkh-orgil',
  email: 'monkhorgilbayarbaatar@gmail.com',
};

export function HomeScreen({ navigation }: Props) {
  // Bind the chat to screen focus so it shows on Home and hides when the user
  // navigates away (e.g. to Profile).
  const isFocused = useIsFocused();

  // Chat mode opens full-screen and auto-opens once connected. The component
  // renders nothing — the messenger UI is presented natively over the app.
  return (
    <ErxesMessenger
      visible={isFocused}
      integrationId={INTEGRATION_ID}
      endpoint={ENDPOINT}
      displayMode="chat"
      user={CURRENT_USER}
      homeActions={[
        {
          id: 'profile',
          title: 'Profile',
          systemIcon: 'person.crop.circle',
          // Just navigate — don't `hide()` first. Dismissing the native
          // messenger before navigating uncovers the empty Home screen for a
          // frame (the "blank Home, no data" flash). Navigating pushes Profile
          // underneath the still-presented modal; losing focus then flips
          // `visible` to false, which dismisses the modal to reveal Profile.
          onPress: () => {
            navigation.navigate('Profile', { user: CURRENT_USER });
          },
        },
      ]}
    />
  );
}
