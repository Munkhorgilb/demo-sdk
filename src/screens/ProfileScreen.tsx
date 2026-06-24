import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ErxesNativeIOS } from 'rn-erxes-sdk';
import type { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export function ProfileScreen({ route }: Props) {
  const { user } = route.params;
  const initial = user.name.charAt(0).toUpperCase();

  const handleClearCache = async () => {
    try {
      await ErxesNativeIOS.clearUser();
      Alert.alert('Cache cleared');
    } catch (error) {
      Alert.alert('Failed to clear cache', String(error));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Pressable style={styles.clearButton} onPress={handleClearCache}>
        <Text style={styles.clearButtonText}>Clear cache</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3f78d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 48, fontWeight: '700', color: '#fff' },
  name: { fontSize: 22, fontWeight: '700', color: '#111' },
  email: { fontSize: 15, color: '#666' },
  clearButton: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#d93f3f',
  },
  clearButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});
