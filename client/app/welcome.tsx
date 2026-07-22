import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 3, backgroundColor: '#fff' }}>
          <Image
            source={require('../assets/background/get_started.png')}
            style={{ flex: 1, width: '100%' }}
            resizeMode="cover"
          />
          <Image
            source={require('../assets/logo/SakayNE.png')}
            style={{ position: 'absolute', top: 40, alignSelf: 'center', width: 180, height: 180 }}
            resizeMode="contain"
          />
        </View>

        <View style={{ flex: 1, marginTop: -24 }}>
          <View style={{ flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 28, paddingTop: 32, paddingBottom: 16 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 24, fontWeight: '800', color: '#1A1A2E', textAlign: 'center', lineHeight: 32 }}>
                Let's Get Started{'\n'}to Continue
              </Text>
              <Text style={{ fontSize: 14, color: '#8E8EA0', textAlign: 'center', marginTop: 12, lineHeight: 20, paddingHorizontal: 4 }}>
                To continue, you need to create an account. Select a login method below.
              </Text>
            </View>

            <View style={{ paddingBottom: 8 }}>
              <TouchableOpacity
                onPress={() => router.push('/(auth)/signup')}
                activeOpacity={0.85}
                style={{
                  width: '100%', height: 54, borderRadius: 16,
                  justifyContent: 'center', alignItems: 'center',
                  backgroundColor: '#3F8451',
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.3 }}>
                  Get Started
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 14, color: '#8E8EA0' }}>
                  I already have an account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
