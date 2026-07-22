import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { login } from '@/src/services/auth';

const LOGO_SRC = require('@/assets/logo/SakayNE.png');

function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

function isPhone(value: string) {
  return /^[\d\s+\-()]+$/.test(value) && value.replace(/\D/g, '').length >= 10;
}

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const validate = () => {
    const newErrors: Record<string, string | undefined> = {};
    if (!identifier.trim()) {
      newErrors.identifier = 'Email or phone number is required';
    } else if (!isEmail(identifier) && !isPhone(identifier)) {
      newErrors.identifier = 'Enter a valid email or PH number';
    }
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await login(identifier, password);
      router.replace('/(tabs)');
    } catch (err: any) {
      setErrors({ password: err.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow px-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center mt-2"
          >
            <Ionicons name="arrow-back" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>

          <View className="flex-1 justify-center pb-8">
            <View className="items-center mb-10">
              <Image
                source={LOGO_SRC}
                className="w-32 h-32 mb-4"
                contentFit="contain"
              />
              <Text className="text-2xl font-extrabold text-gray-900">
                Welcome Back
              </Text>
              <Text className="text-sm text-gray-400 mt-1">
                Sign in to continue your ride
              </Text>
            </View>

            <Input
              label="Email or Phone Number"
              placeholder="Enter your email or phone number"
              value={identifier}
              onChangeText={(text) => { setIdentifier(text); setErrors((e) => ({ ...e, identifier: undefined })); }}
              keyboardType="default"
              icon="person-outline"
              error={errors.identifier}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => { setPassword(text); setErrors((e) => ({ ...e, password: undefined })); }}
              secureTextEntry
              icon="lock-closed-outline"
              error={errors.password}
            />

            <TouchableOpacity className="self-end mb-6">
              <Text className="text-sm font-semibold" style={{ color: Colors.primary }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              onPress={handleLogin}
              variant="primary"
              size="lg"
              loading={loading}
            />

            <View className="flex-row items-center my-6">
              <View className="h-px flex-1 bg-gray-200" />
              <Text className="mx-4 text-sm text-gray-400">or</Text>
              <View className="h-px flex-1 bg-gray-200" />
            </View>

            <TouchableOpacity
              className="flex-row items-center justify-center py-3.5 rounded-xl mb-3"
              style={{ borderWidth: 1, borderColor: '#E5E7EB' }}
            >
              <Ionicons name="logo-google" size={20} color="#4285F4" />
              <Text className="ml-2 text-sm font-semibold text-gray-700">
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center justify-center py-3.5 rounded-xl"
              style={{ borderWidth: 1, borderColor: '#E5E7EB' }}
            >
              <Ionicons name="logo-apple" size={20} color="#000" />
              <Text className="ml-2 text-sm font-semibold text-gray-700">
                Continue with Apple
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center items-center pb-6">
            <Text className="text-sm text-gray-400">
              Don&apos;t have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/signup')}>
              <Text className="text-sm font-bold" style={{ color: Colors.primary }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
