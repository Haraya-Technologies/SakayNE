import { Button } from '@/src/components/ui/Button';
import '@/global.css';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LOGO_SRC = require('@/assets/logo/SakayNE.png');

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-between px-6 py-12">
        <View />

        <View className="items-center">
          <Image
            source={LOGO_SRC}
            className="w-52 h-52"
            contentFit="contain"
          />
        </View>

        <View className="w-full">
          <Button
            title="Get Started"
            onPress={() => router.push('/(auth)/signup')}
            variant="primary"
            size="lg"
          />
          <View className="mt-4">
            <Button
              title="I already have an account"
              onPress={() => router.push('/(auth)/login')}
              variant="outline"
              size="lg"
            />
          </View>
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
    </SafeAreaView>
  );
}
