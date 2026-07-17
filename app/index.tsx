import '@/global.css';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Button } from '@/components/Button';
import { VehicleCard } from '@/components/VehicleCard';

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: Colors.background }}>
      <ScrollView
        contentContainerClassName="flex-grow px-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center items-center pt-12 pb-6">
          <View className="w-24 h-24 rounded-3xl items-center justify-center mb-6"
            style={{ backgroundColor: Colors.primary + '12' }}
          >
            <Ionicons name="bus" size={48} color={Colors.primary} />
          </View>

          <Text className="text-4xl font-extrabold mb-2" style={{ color: Colors.text }}>
            SAKAY
          </Text>
          <Text className="text-base text-center mb-8" style={{ color: Colors.textSecondary }}>
            Your ride, your way. Book jeepneys, buses,{'\n'}motorcycles, and tricycles in one tap.
          </Text>

          <View className="flex-row justify-center mb-8">
            <VehicleCard name="Jeepney" icon="bus" color={Colors.jeepneyGold} />
            <VehicleCard name="Bus" icon="train" color={Colors.jeepneyBlue} />
            <VehicleCard name="Motor" icon="bicycle" color={Colors.accent} />
            <VehicleCard name="Tricycle" icon="car-sport" color={Colors.jeepneyRed} />
          </View>

          <View className="w-full space-y-3">
            <Button
              title="Get Started"
              onPress={() => router.push('/(auth)/signup')}
              variant="primary"
              size="lg"
            />
            <Button
              title="I already have an account"
              onPress={() => router.push('/(auth)/login')}
              variant="outline"
              size="lg"
            />
          </View>
        </View>

        <View className="flex-row items-center justify-center pb-6 pt-4">
          <View className="h-px flex-1" style={{ backgroundColor: Colors.border }} />
          <Text className="mx-4 text-xs" style={{ color: Colors.textTertiary }}>
            Safe &bull; Fast &bull; Affordable
          </Text>
          <View className="h-px flex-1" style={{ backgroundColor: Colors.border }} />
        </View>

        <View className="flex-row justify-center gap-6 pb-8">
          <View className="items-center">
            <View className="w-10 h-10 rounded-full items-center justify-center mb-1"
              style={{ backgroundColor: Colors.success + '15' }}
            >
              <Ionicons name="shield-checkmark" size={18} color={Colors.success} />
            </View>
            <Text className="text-[10px] font-medium" style={{ color: Colors.textSecondary }}>
              Safe
            </Text>
          </View>
          <View className="items-center">
            <View className="w-10 h-10 rounded-full items-center justify-center mb-1"
              style={{ backgroundColor: Colors.primary + '15' }}
            >
              <Ionicons name="speedometer" size={18} color={Colors.primary} />
            </View>
            <Text className="text-[10px] font-medium" style={{ color: Colors.textSecondary }}>
              Fast
            </Text>
          </View>
          <View className="items-center">
            <View className="w-10 h-10 rounded-full items-center justify-center mb-1"
              style={{ backgroundColor: Colors.secondary + '25' }}
            >
              <Ionicons name="pricetag" size={18} color={Colors.secondaryDark} />
            </View>
            <Text className="text-[10px] font-medium" style={{ color: Colors.textSecondary }}>
              Affordable
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
