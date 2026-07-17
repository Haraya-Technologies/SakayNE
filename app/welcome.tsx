import '@/global.css';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Button } from '@/components/Button';

const { width } = Dimensions.get('window');

function VehicleCard({ name, icon, color, desc }: { name: string; icon: keyof typeof Ionicons.glyphMap; color: string; desc: string }) {
  return (
    <View
      className="rounded-2xl p-4 items-center flex-1 mx-1.5"
      style={{ backgroundColor: color + '12', borderWidth: 1, borderColor: color + '20' }}
    >
      <View
        className="w-14 h-14 rounded-xl items-center justify-center mb-2"
        style={{ backgroundColor: color + '20' }}
      >
        <Ionicons name={icon} size={26} color={color} />
      </View>
      <Text className="text-sm font-bold text-center" style={{ color: Colors.text }}>
        {name}
      </Text>
      <Text className="text-[10px] text-center mt-0.5" style={{ color: Colors.textTertiary }}>
        {desc}
      </Text>
    </View>
  );
}

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: Colors.background }}>
      <ScrollView
        contentContainerClassName="flex-grow"
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View
          className="relative px-6 pt-8 pb-12"
          style={{ backgroundColor: Colors.deepForest }}
        >
          {/* Decorative shapes */}
          <View
            className="absolute rounded-full"
            style={{ width: 180, height: 180, top: -50, right: -50, backgroundColor: Colors.pineShade, opacity: 0.7 }}
          />
          <View
            className="absolute rounded-full"
            style={{ width: 100, height: 100, bottom: 20, left: -20, backgroundColor: Colors.emeraldDepth, opacity: 0.5 }}
          />

          {/* Logo */}
          <View className="flex-row items-center mb-8">
            <View
              className="w-12 h-12 rounded-xl items-center justify-center"
              style={{ backgroundColor: Colors.botanicalGreen + '30' }}
            >
              <Ionicons name="bus" size={26} color={Colors.botanicalGreen} />
            </View>
            <Text
              className="font-extrabold ml-3"
              style={{ fontSize: 22, color: Colors.pistachioCream, letterSpacing: 2 }}
            >
              SakayNE
            </Text>
          </View>

          {/* Hero Text */}
          <Text
            className="font-extrabold leading-tight mb-3"
            style={{ fontSize: 32, color: Colors.pistachioCream }}
          >
            Travel Smart,{'\n'}
            <Text style={{ color: Colors.botanicalGreen }}>Ride Easy.</Text>
          </Text>
          <Text
            className="leading-relaxed"
            style={{ fontSize: 15, color: Colors.sageLeaf, maxWidth: width * 0.75 }}
          >
            Book jeepneys, buses, motorcycles, and tricycles — all in one app. Fast, safe, and affordable.
          </Text>
        </View>

        {/* Vehicle Types Section */}
        <View className="px-6 pt-8 pb-4">
          <Text className="text-xl font-extrabold mb-1" style={{ color: Colors.text }}>
            Choose Your Ride
          </Text>
          <Text className="text-sm mb-6" style={{ color: Colors.textSecondary }}>
            Multiple transport options at your fingertips
          </Text>

          <View className="flex-row mb-3">
            <VehicleCard name="Jeepney" icon="bus" color={Colors.botanicalGreen} desc="Classic PH ride" />
            <VehicleCard name="Bus" icon="train" color={Colors.softFern} desc="Long distance" />
          </View>
          <View className="flex-row">
            <VehicleCard name="Motor" icon="bicycle" color={Colors.mossGreen} desc="Quick trip" />
            <VehicleCard name="Tricycle" icon="car-sport" color={Colors.sageLeaf} desc="Last mile" />
          </View>
        </View>

        {/* Features Section */}
        <View className="px-6 py-6">
          <View className="flex-row gap-3">
            <FeatureBadge icon="shield-checkmark" label="Safe" color={Colors.botanicalGreen} />
            <FeatureBadge icon="speedometer" label="Fast" color={Colors.softFern} />
            <FeatureBadge icon="wallet" label="Affordable" color={Colors.mossGreen} />
          </View>
        </View>

        {/* CTA Section */}
        <View className="px-6 pt-4 pb-10">
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

        {/* Footer */}
        <View className="items-center pb-8">
          <Text className="text-[10px]" style={{ color: Colors.textTertiary }}>
            powered by Haraya IT Solution
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeatureBadge({ icon, label, color }: { icon: keyof typeof Ionicons.glyphMap; label: string; color: string }) {
  return (
    <View className="flex-1 flex-row items-center rounded-xl py-3 px-3" style={{ backgroundColor: color + '10' }}>
      <View
        className="w-8 h-8 rounded-lg items-center justify-center mr-2"
        style={{ backgroundColor: color + '20' }}
      >
        <Ionicons name={icon} size={16} color={color} />
      </View>
      <Text className="text-xs font-bold" style={{ color: color }}>
        {label}
      </Text>
    </View>
  );
}
