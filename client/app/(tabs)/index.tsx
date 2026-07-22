import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';
import { getCurrentUser, logout } from '@/src/services/auth';
import { User } from '@/src/types';
import { router } from 'expo-router';

export default function DashboardHome() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace('/welcome');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-8">
            <View>
              <Text className="text-sm text-gray-400">Good day,</Text>
              <Text className="text-2xl font-extrabold text-gray-900">
                {user?.fullName || 'Rider'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
            >
              <Ionicons name="log-out-outline" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View
            className="rounded-2xl p-5 mb-6"
            style={{ backgroundColor: Colors.primary }}
          >
            <Text className="text-white text-lg font-bold mb-1">
              Book a Ride
            </Text>
            <Text className="text-white/70 text-sm mb-4">
              Where are you going today?
            </Text>
            <View className="flex-row items-center bg-white/20 rounded-xl px-4 py-3">
              <Ionicons name="search" size={18} color="#fff" />
              <Text className="ml-2 text-white/60 text-sm">
                Search destination...
              </Text>
            </View>
          </View>

          <Text className="text-lg font-extrabold text-gray-900 mb-4">
            Quick Ride
          </Text>

          <View className="flex-row gap-3 mb-4">
            <RideTypeCard icon="bus" label="Jeepney" color={Colors.botanicalGreen} />
            <RideTypeCard icon="car-sport" label="Tricycle" color={Colors.softFern} />
          </View>
          <View className="flex-row gap-3">
            <RideTypeCard icon="bicycle" label="Motor" color={Colors.mossGreen} />
            <RideTypeCard icon="train" label="Bus" color={Colors.sageLeaf} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RideTypeCard({ icon, label, color }: { icon: keyof typeof Ionicons.glyphMap; label: string; color: string }) {
  return (
    <TouchableOpacity
      className="flex-1 rounded-2xl p-4 items-center"
      style={{ backgroundColor: color + '12', borderWidth: 1, borderColor: color + '20' }}
    >
      <View
        className="w-12 h-12 rounded-xl items-center justify-center mb-2"
        style={{ backgroundColor: color + '20' }}
      >
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text className="text-sm font-semibold text-center" style={{ color }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
