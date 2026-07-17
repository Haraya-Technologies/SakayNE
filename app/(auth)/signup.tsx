import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // TODO: Replace with actual auth logic
    }, 1500);
  };

  const clearError = (field: string) => {
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: Colors.deepForest }}>
      {/* Decorative circles */}
      <View className="absolute top-0 left-0 right-0" style={{ height: 250 }}>
        <View
          className="absolute rounded-full"
          style={{
            width: 150,
            height: 150,
            top: -40,
            right: -30,
            backgroundColor: Colors.pineShade,
            opacity: 0.5,
          }}
        />
        <View
          className="absolute rounded-full"
          style={{
            width: 80,
            height: 80,
            top: 60,
            left: -20,
            backgroundColor: Colors.emeraldDepth,
            opacity: 0.3,
          }}
        />
      </View>

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
            className="w-10 h-10 rounded-full items-center justify-center mt-2 mb-4"
            style={{ backgroundColor: Colors.pineShade + '60' }}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.pistachioCream} />
          </TouchableOpacity>

          <View className="py-4">
            {/* Logo */}
            <View
              className="w-16 h-16 rounded-2xl items-center justify-center mb-6"
              style={{
                backgroundColor: Colors.botanicalGreen + '20',
                borderWidth: 2,
                borderColor: Colors.botanicalGreen + '40',
              }}
            >
              <Ionicons name="person-add" size={32} color={Colors.botanicalGreen} />
            </View>

            <Text className="text-3xl font-extrabold mb-1" style={{ color: Colors.pistachioCream }}>
              Create Account
            </Text>
            <Text className="text-base mb-8" style={{ color: Colors.sageLeaf }}>
              Join SakayNE and start riding today
            </Text>

            <Input
              label="Full Name"
              placeholder="Juan Dela Cruz"
              value={fullName}
              onChangeText={(text) => { setFullName(text); clearError('fullName'); }}
              icon="person-outline"
              error={errors.fullName}
              autoCapitalize="words"
              darkTheme
            />

            <Input
              label="Email"
              placeholder="juan@email.com"
              value={email}
              onChangeText={(text) => { setEmail(text); clearError('email'); }}
              keyboardType="email-address"
              icon="mail-outline"
              error={errors.email}
              darkTheme
            />

            <Input
              label="Phone Number"
              placeholder="+63 9XX XXX XXXX"
              value={phone}
              onChangeText={(text) => { setPhone(text); clearError('phone'); }}
              keyboardType="phone-pad"
              icon="phone-portrait-outline"
              error={errors.phone}
              darkTheme
            />

            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={(text) => { setPassword(text); clearError('password'); }}
              secureTextEntry
              icon="lock-closed-outline"
              error={errors.password}
              darkTheme
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={(text) => { setConfirmPassword(text); clearError('confirmPassword'); }}
              secureTextEntry
              icon="lock-closed-outline"
              error={errors.confirmPassword}
              darkTheme
            />

            <View className="flex-row items-start mt-2 mb-6">
              <View
                className="w-5 h-5 rounded items-center justify-center mt-0.5 mr-2"
                style={{ backgroundColor: Colors.botanicalGreen }}
              >
                <Ionicons name="checkmark" size={12} color="#fff" />
              </View>
              <Text className="flex-1 text-sm leading-5" style={{ color: Colors.sageLeaf }}>
                I agree to the{' '}
                <Text style={{ color: Colors.botanicalGreen }} className="font-semibold">
                  Terms of Service
                </Text>
                {' '}and{' '}
                <Text style={{ color: Colors.botanicalGreen }} className="font-semibold">
                  Privacy Policy
                </Text>
              </Text>
            </View>

            <Button
              title="Create Account"
              onPress={handleSignup}
              variant="primary"
              size="lg"
              loading={loading}
            />

            <View className="flex-row items-center my-6">
              <View className="h-px flex-1" style={{ backgroundColor: Colors.mossGreen + '40' }} />
              <Text className="mx-4 text-sm" style={{ color: Colors.oliveMist }}>
                or sign up with
              </Text>
              <View className="h-px flex-1" style={{ backgroundColor: Colors.mossGreen + '40' }} />
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center py-3 rounded-xl"
                style={{ borderWidth: 1, borderColor: Colors.mossGreen + '40', backgroundColor: Colors.pineShade + '40' }}
              >
                <Ionicons name="logo-google" size={20} color="#DB4437" />
                <Text className="ml-2 text-sm font-semibold" style={{ color: Colors.pistachioCream }}>
                  Google
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 flex-row items-center justify-center py-3 rounded-xl"
                style={{ borderWidth: 1, borderColor: Colors.mossGreen + '40', backgroundColor: Colors.pineShade + '40' }}
              >
                <Ionicons name="logo-facebook" size={20} color="#1877F2" />
                <Text className="ml-2 text-sm font-semibold" style={{ color: Colors.pistachioCream }}>
                  Facebook
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row justify-center items-center pb-6 pt-4">
            <Text className="text-sm" style={{ color: Colors.sageLeaf }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text className="text-sm font-bold" style={{ color: Colors.botanicalGreen }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="items-center pb-8">
            <View className="h-px w-24 mb-4" style={{ backgroundColor: Colors.mossGreen + '40' }} />
            <Text className="text-[10px]" style={{ color: Colors.oliveMist }}>
              powered by Haraya IT Solution
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
