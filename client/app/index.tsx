import '@/global.css';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

const LOGO_SRC = require('@/assets/logo/SakayNE.png');

export default function PreLoader() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-between bg-white py-20">
      <View />

      <View className="items-center">
        <Image
          source={LOGO_SRC}
          className="w-32 h-32"
          contentFit="contain"
        />
      </View>

      <View className="items-center">
        <Text className="text-xs text-gray-400">
          powered by
        </Text>
        <Text className="text-sm font-bold text-gray-500 mt-0.5 tracking-wide">
          Haraya IT Solution
        </Text>
      </View>
    </View>
  );
}
