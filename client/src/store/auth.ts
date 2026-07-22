import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/src/types';

const AUTH_KEY = '@sakayne_auth';
const TOKEN_KEY = '@sakayne_token';

export async function saveAuth(user: User, token: string) {
  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function getAuth(): Promise<{ user: User | null; token: string | null }> {
  const userStr = await AsyncStorage.getItem(AUTH_KEY);
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return {
    user: userStr ? JSON.parse(userStr) : null,
    token,
  };
}

export async function clearAuth() {
  await AsyncStorage.multiRemove([AUTH_KEY, TOKEN_KEY]);
}

export async function isLoggedIn(): Promise<boolean> {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return !!token;
}
