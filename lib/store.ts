import { create } from 'zustand';
import { User, UserRole } from './types';

interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  isAdmin: () => boolean;
  isVip: () => boolean;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  theme: 'dark',
  setUser: (user: User | null) => set({ user }),
  setTheme: (theme: 'light' | 'dark') => {
    set({ theme });
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  },
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark';
    get().setTheme(newTheme);
  },
  isAdmin: () => get().user?.role === 'admin',
  isVip: () => get().user?.role === 'vip' || get().user?.role === 'admin',
}));

