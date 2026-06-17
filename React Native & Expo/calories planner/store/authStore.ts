import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { User } from '@/types';

const TOKEN_KEY = 'fieldops_jwt';

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  setAuth: (token: string, user: User) => Promise<void>;
  clearAuth: () => Promise<void>;
  loadAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: true,

  setAuth: async (token, user) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    set({ token, user });
  },

  clearAuth: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    set({ token: null, user: null });
  },

  loadAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!token) { set({ isLoading: false }); return; }
      const parts = token.split('.');
      if (parts.length !== 3) { set({ isLoading: false }); return; }
      const payload = JSON.parse(atob(parts[1]));
      const user: User = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      };
      set({ token, user, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
