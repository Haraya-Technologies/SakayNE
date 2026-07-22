import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';
import { getCurrentUser, logout, updateUserProfile } from '@/src/auth/auth.service';
import { User } from '@/src/types';
import { router } from 'expo-router';
import { Input } from '@/src/components/ui/Input';

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (u) {
        setUser(u);
        setFullName(u.fullName);
        setEmail(u.email);
        setPhone(u.phone);
      }
    });
  }, []);

  const handleSave = async () => {
    if (!user?._id) return;
    await updateUserProfile(user._id, { fullName, email, phone });
    setUser({ ...user, fullName, email, phone });
    setEditing(false);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/welcome');
  };

  if (!user) return null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-2xl font-extrabold text-gray-900">Profile</Text>
            {editing ? (
              <TouchableOpacity onPress={handleSave}>
                <Text className="text-base font-bold" style={{ color: Colors.primary }}>
                  Save
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setEditing(true)}>
                <Text className="text-base font-bold" style={{ color: Colors.primary }}>
                  Edit
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="items-center mb-8">
            <View
              className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-3"
              style={{ borderWidth: 3, borderColor: Colors.primary }}
            >
              <Text className="text-3xl font-extrabold" style={{ color: Colors.primary }}>
                {user.fullName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="text-lg font-bold text-gray-900">{user.fullName}</Text>
            <View
              className="px-3 py-0.5 rounded-full mt-1"
              style={{ backgroundColor: user.role === 'driver' ? Colors.warning + '20' : Colors.primary + '15' }}
            >
              <Text
                className="text-xs font-semibold capitalize"
                style={{ color: user.role === 'driver' ? Colors.warning : Colors.primary }}
              >
                {user.role}
              </Text>
            </View>
          </View>

          <View className="mb-6">
            <Input
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              icon="person-outline"
              editable={editing}
              autoCapitalize="words"
            />
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              icon="mail-outline"
              editable={editing}
            />
            <Input
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              icon="phone-portrait-outline"
              editable={editing}
            />
          </View>

          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center justify-center py-3.5 rounded-xl"
            style={{ borderWidth: 1, borderColor: Colors.error + '20' }}
          >
            <Ionicons name="log-out-outline" size={20} color={Colors.error} />
            <Text className="ml-2 text-sm font-semibold" style={{ color: Colors.error }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
