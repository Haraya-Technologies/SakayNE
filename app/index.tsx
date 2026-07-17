import '@/global.css';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function PreLoader() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      className="flex-1 items-center justify-between"
      style={{ backgroundColor: Colors.deepForest, paddingTop: 80, paddingBottom: 40 }}
    >
      {/* Decorative circles */}
      <View className="absolute top-0 left-0 right-0" style={{ height: 300 }}>
        <View
          className="absolute rounded-full"
          style={{
            width: 200,
            height: 200,
            top: -60,
            right: -40,
            backgroundColor: Colors.pineShade,
            opacity: 0.6,
          }}
        />
        <View
          className="absolute rounded-full"
          style={{
            width: 120,
            height: 120,
            top: 40,
            left: -30,
            backgroundColor: Colors.emeraldDepth,
            opacity: 0.4,
          }}
        />
      </View>

      {/* Center content */}
      <View className="flex-1 items-center justify-center">
        {/* Logo container */}
        <View
          className="w-28 h-28 rounded-3xl items-center justify-center mb-8"
          style={{
            backgroundColor: Colors.botanicalGreen + '20',
            borderWidth: 2,
            borderColor: Colors.botanicalGreen + '40',
          }}
        >
          <Ionicons name="bus" size={56} color={Colors.botanicalGreen} />
        </View>

        {/* App name */}
        <Text
          className="font-extrabold"
          style={{
            fontSize: 42,
            color: Colors.pistachioCream,
            letterSpacing: 4,
          }}
        >
          SakayNE
        </Text>

        {/* Tagline */}
        <Text
          className="text-center mt-3"
          style={{
            fontSize: 15,
            color: Colors.sageLeaf,
            letterSpacing: 1,
          }}
        >
          Your Ride, Your Way
        </Text>

        {/* Loading dots */}
        <View className="flex-row mt-10 gap-2">
          <View
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: Colors.botanicalGreen }}
          />
          <View
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: Colors.softFern }}
          />
          <View
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: Colors.sageLeaf }}
          />
        </View>
      </View>

      {/* Bottom branding */}
      <View className="items-center">
        <View className="h-px w-24 mb-4" style={{ backgroundColor: Colors.mossGreen + '40' }} />
        <Text
          className="text-center"
          style={{
            fontSize: 11,
            color: Colors.oliveMist,
            letterSpacing: 0.5,
          }}
        >
          powered by
        </Text>
        <Text
          className="text-center mt-1 font-bold"
          style={{
            fontSize: 14,
            color: Colors.lindenGreen,
            letterSpacing: 1.5,
          }}
        >
          Haraya IT Solution
        </Text>
      </View>
    </View>
  );
}
