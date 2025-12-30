import { create } from 'zustand';

interface AuthState {
  jwt: string | null;
  setJwt: (jwt: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  jwt: null,
  setJwt: (jwt) => set({ jwt }),
}));
