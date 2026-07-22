import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { signup } from '@/src/services/auth';

const LOGO_SRC = require('@/assets/logo/SakayNE.png');

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const validate = () => {
    const newErrors: Record<string, string | undefined> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Enter a valid phone number';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreedToTerms) newErrors.terms = 'You must agree to the Terms of Service';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await signup(fullName, email, phone, password);
      router.replace('/(tabs)');
    } catch (err: any) {
      setErrors({ email: err.message || 'Signup failed' });
    } finally {
      setLoading(false);
    }
  };

  const clearError = (field: string) => {
    setErrors((e) => ({ ...e, [field]: undefined }));
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
                Create Account
              </Text>
              <Text className="text-sm text-gray-400 mt-1">
                Join SakayNE and start riding today
              </Text>
            </View>

            <Input
              label="Full Name"
              placeholder="Juan Dela Cruz"
              value={fullName}
              onChangeText={(text) => { setFullName(text); clearError('fullName'); }}
              icon="person-outline"
              error={errors.fullName}
              autoCapitalize="words"
            />

            <Input
              label="Email"
              placeholder="juan@email.com"
              value={email}
              onChangeText={(text) => { setEmail(text); clearError('email'); }}
              keyboardType="email-address"
              icon="mail-outline"
              error={errors.email}
            />

            <Input
              label="Phone Number"
              placeholder="+63 9XX XXX XXXX"
              value={phone}
              onChangeText={(text) => { setPhone(text); clearError('phone'); }}
              keyboardType="phone-pad"
              icon="phone-portrait-outline"
              error={errors.phone}
            />

            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={(text) => { setPassword(text); clearError('password'); }}
              secureTextEntry
              icon="lock-closed-outline"
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={(text) => { setConfirmPassword(text); clearError('confirmPassword'); }}
              secureTextEntry
              icon="lock-closed-outline"
              error={errors.confirmPassword}
            />

            <TouchableOpacity
              className="flex-row items-start mt-2 mb-6"
              onPress={() => { setAgreedToTerms(!agreedToTerms); setErrors((e) => ({ ...e, terms: undefined })); }}
              activeOpacity={0.7}
            >
              <View
                className="w-5 h-5 rounded items-center justify-center mt-0.5 mr-2"
                style={{
                  backgroundColor: agreedToTerms ? Colors.primary : '#E5E7EB',
                  borderWidth: agreedToTerms ? 0 : 1,
                  borderColor: '#D1D5DB',
                }}
              >
                {agreedToTerms && (
                  <Ionicons name="checkmark" size={12} color="#fff" />
                )}
              </View>
              <Text className="flex-1 text-sm leading-5 text-gray-500">
                I agree to the{' '}
                <Text style={{ color: Colors.primary }} className="font-semibold">
                  Terms of Service
                </Text>
                {' '}and{' '}
                <Text style={{ color: Colors.primary }} className="font-semibold">
                  Privacy Policy
                </Text>
              </Text>
            </TouchableOpacity>
            {errors.terms && (
              <Text className="text-xs -mt-4 mb-4 ml-1" style={{ color: Colors.error }}>
                {errors.terms}
              </Text>
            )}

            <Button
              title="Create Account"
              onPress={handleSignup}
              variant="primary"
              size="lg"
              loading={loading}
            />
          </View>

          <View className="flex-row justify-center items-center pb-6">
            <Text className="text-sm text-gray-400">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text className="text-sm font-bold" style={{ color: Colors.primary }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
