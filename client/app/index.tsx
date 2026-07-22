import '@/global.css';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, Text, View } from 'react-native';

export default function PreLoader() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-between bg-white pb-12">
      <View />

      <View className="items-center">
        <Image
          source={require('../assets/logo/SakayNE.png')}
          className="w-36 h-36"
          resizeMode="contain"
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
