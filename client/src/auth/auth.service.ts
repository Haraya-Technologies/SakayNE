import { saveAuth, clearAuth, getAuth } from './auth.store';
import { User } from '@/src/types';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function signup(
  fullName: string,
  email: string,
  phone: string,
  password: string,
  role: 'passenger' | 'driver' = 'passenger',
) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, phone, password, role }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');

  await saveAuth(data.user, data.token);
  return data;
}

export async function login(identifier: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');

  await saveAuth(data.user, data.token);
  return data;
}

export async function logout() {
  await clearAuth();
}

export async function getCurrentUser(): Promise<User | null> {
  const { user } = await getAuth();
  return user;
}

export async function getUserProfile(userId: string) {
  const res = await fetch(`${API_BASE}/users/profile`, {
    headers: { 'user-id': userId },
  });
  const data = await res.json();
  return data.user as User;
}

export async function updateUserProfile(userId: string, updates: Partial<User>) {
  await fetch(`${API_BASE}/users/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'user-id': userId,
    },
    body: JSON.stringify(updates),
  });
}
