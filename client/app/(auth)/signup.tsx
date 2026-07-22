import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/src/components/ui/Input';
import { signup } from '@/src/auth/auth.service';

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
    else if (password.length < 6) newErrors.password = 'At least 6 characters';
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
      router.push({ pathname: '/(auth)/verify-otp', params: { email } });
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
              Create Account
            </Text>
            <Text style={{ fontSize: 15, textAlign: 'center', color: '#8FA092', marginBottom: 32, lineHeight: 22 }}>
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
              style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 4, marginBottom: 24 }}
              onPress={() => { setAgreedToTerms(!agreedToTerms); setErrors((e) => ({ ...e, terms: undefined })); }}
              activeOpacity={0.7}
            >
              <View style={{
                width: 20, height: 20, borderRadius: 6, marginTop: 2, marginRight: 10,
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: agreedToTerms ? '#3F8451' : '#F5F7F5',
                borderWidth: agreedToTerms ? 0 : 1, borderColor: '#D6E4D8',
              }}>
                {agreedToTerms && <Ionicons name="checkmark" size={14} color="#fff" />}
              </View>
              <Text style={{ flex: 1, fontSize: 13, lineHeight: 20, color: '#8FA092' }}>
                I agree to the{' '}
                <Text style={{ color: '#3F8451', fontWeight: '600' }}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={{ color: '#3F8451', fontWeight: '600' }}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
            {errors.terms && (
              <Text style={{ fontSize: 12, color: '#C0392B', marginTop: -16, marginBottom: 16, marginLeft: 4 }}>
                {errors.terms}
              </Text>
            )}

            <TouchableOpacity
              onPress={handleSignup}
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
                  Create Account
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 24 }}>
            <Text style={{ fontSize: 14, color: '#8FA092' }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#3F8451' }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
