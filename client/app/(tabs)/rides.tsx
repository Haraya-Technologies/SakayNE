import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';

const MOCK_RIDES = [
  { id: '1', origin: 'Makati', destination: 'Quezon City', status: 'completed', fare: 150, date: 'July 17, 2026' },
  { id: '2', origin: 'Manila', destination: 'Pasay', status: 'cancelled', fare: 0, date: 'July 16, 2026' },
  { id: '3', origin: 'Taguig', destination: 'Paranaque', status: 'completed', fare: 200, date: 'July 15, 2026' },
];

const statusColors: Record<string, string> = {
  completed: Colors.success,
  cancelled: Colors.error,
  ongoing: Colors.warning,
  pending: Colors.textTertiary,
};

export default function RidesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-4 pb-6">
          <Text className="text-2xl font-extrabold text-gray-900 mb-6">
            My Rides
          </Text>

          {MOCK_RIDES.map((ride) => (
            <View
              key={ride.id}
              className="rounded-2xl p-4 mb-3"
              style={{ borderWidth: 1, borderColor: '#F3F4F6' }}
            >
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center mr-3">
                    <Ionicons name="car" size={20} color={Colors.primary} />
                  </View>
                  <View>
                    <Text className="text-sm font-bold text-gray-900">
                      {ride.origin} → {ride.destination}
                    </Text>
                    <Text className="text-xs text-gray-400">{ride.date}</Text>
                  </View>
                </View>
                <Text
                  className="text-xs font-bold capitalize px-3 py-1 rounded-lg"
                  style={{ color: statusColors[ride.status], backgroundColor: statusColors[ride.status] + '15' }}
                >
                  {ride.status}
                </Text>
              </View>
              {ride.fare > 0 && (
                <Text className="text-sm font-semibold text-gray-600">
                  Fare: PHP {ride.fare}
                </Text>
              )}
            </View>
          ))}

          {MOCK_RIDES.length === 0 && (
            <View className="items-center py-20">
              <Ionicons name="car-outline" size={64} color={Colors.textTertiary} />
              <Text className="text-gray-400 mt-4 text-lg">No rides yet</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
