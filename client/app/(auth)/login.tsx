import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/src/components/ui/Input';
import { login } from '@/src/auth/auth.service';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ width: 44, height: 44, justifyContent: 'center', alignItems: 'center', marginTop: 8 }}
          >
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F7F5', justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="arrow-back" size={22} color="#0D1F16" />
            </View>
          </TouchableOpacity>

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: '800', textAlign: 'center', color: '#0D1F16', marginBottom: 6 }}>
              Welcome Back
            </Text>
            <Text style={{ fontSize: 15, textAlign: 'center', color: '#8FA092', marginBottom: 40, lineHeight: 22 }}>
              Sign in to continue your ride
            </Text>

            <Input
              label="Email or Phone Number"
              placeholder="Enter your email or phone"
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

            <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 32 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#3F8451' }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
              style={{
                width: '100%', height: 54, borderRadius: 16,
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: '#3F8451', opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 24 }}>
            <Text style={{ fontSize: 14, color: '#8FA092' }}>
              Don&apos;t have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/signup')}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#3F8451' }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
