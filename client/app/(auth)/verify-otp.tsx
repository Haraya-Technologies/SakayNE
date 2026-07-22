import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { verifyEmail } from '@/src/auth/auth.service';

const EXPIRY_SECONDS = 300;

export default function VerifyOTPScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(EXPIRY_SECONDS);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (text: string) => {
    setCode(text.replace(/[^0-9]/g, '').slice(0, 6));
    setError('');
  };

  const handleVerify = async () => {
    if (timeLeft === 0) {
      setError('Code expired. Please request a new one.');
      return;
    }
    if (code.length !== 6) {
      setError('Please enter the full 6-digit code');
      return;
    }
    setLoading(true);
    try {
      await verifyEmail(email, code);
      router.replace('/(auth)/login');
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setCode('');
    setError('');
    setTimeLeft(EXPIRY_SECONDS);
    inputRef.current?.focus();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const digits = code.split('');
  const expired = timeLeft === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => router.back()} style={{ width: 44, height: 44, justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F7F5', justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="arrow-back" size={22} color="#0D1F16" />
            </View>
          </TouchableOpacity>

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', marginBottom: 40 }}>
              <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: '#F0F7F1', justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
                <Ionicons name="mail-outline" size={36} color="#3F8451" />
              </View>
              <Text style={{ fontSize: 24, fontWeight: '800', color: '#0D1F16', textAlign: 'center', marginBottom: 8 }}>
                Verify Your Email
              </Text>
              <Text style={{ fontSize: 14, color: '#8FA092', textAlign: 'center', lineHeight: 20 }}>
                We sent a 6-digit code to{'\n'}
                <Text style={{ fontWeight: '600', color: '#0D1F16' }}>{email}</Text>
              </Text>
            </View>

            <View style={{ marginBottom: 24, alignItems: 'center' }}>
              <TextInput
                ref={inputRef}
                value={code}
                onChangeText={handleChange}
                keyboardType="number-pad"
                maxLength={6}
                style={{ position: 'absolute', width: '100%', height: 64, opacity: 0.01, fontSize: 1 }}
              />
              <View style={{ flexDirection: 'row', gap: 10 }}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <View
                    key={i}
                    style={{
                      width: 46, height: 56, borderRadius: 14,
                      backgroundColor: digits[i] ? '#F0F7F1' : '#F5F7F5',
                      borderWidth: code.length === i ? 2 : 1,
                      borderColor: code.length === i ? '#3F8451' : '#E5E7EB',
                      justifyContent: 'center', alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#0D1F16' }}>
                      {digits[i] || ''}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={{ alignItems: 'center', marginBottom: 28 }}>
              <Text style={{ fontSize: 13, color: expired ? '#C0392B' : '#8FA092' }}>
                {expired ? 'Code expired.' : `Code expires in ${minutes}:${seconds.toString().padStart(2, '0')}`}
              </Text>
            </View>

            {error ? (
              <Text style={{ fontSize: 13, color: '#C0392B', textAlign: 'center', marginBottom: 16 }}>{error}</Text>
            ) : null}

            <TouchableOpacity
              onPress={handleVerify}
              disabled={loading || expired}
              activeOpacity={0.85}
              style={{
                width: '100%', height: 54, borderRadius: 16,
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: expired ? '#D6E4D8' : '#3F8451', opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>
                  {expired ? 'Code Expired' : 'Verify Email'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleResend}
              style={{ alignItems: 'center', marginTop: 20 }}
            >
              <Text style={{ fontSize: 14, color: '#3F8451', fontWeight: '600' }}>
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
