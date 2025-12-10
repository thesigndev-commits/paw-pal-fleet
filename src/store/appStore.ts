import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'customer' | 'driver' | 'admin';
export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'th';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
}

interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed: string;
  weight: number;
  photo?: string;
  notes?: string;
}

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  
  // UI State
  theme: ThemeMode;
  language: Language;
  
  // Customer State
  pets: Pet[];
  selectedPet: Pet | null;
  
  // Actions
  setUser: (user: User | null) => void;
  logout: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setLanguage: (language: Language) => void;
  setPets: (pets: Pet[]) => void;
  addPet: (pet: Pet) => void;
  selectPet: (pet: Pet | null) => void;
  switchRole: (role: UserRole) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isAuthenticated: false,
      theme: 'light',
      language: 'en',
      pets: [],
      selectedPet: null,
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      logout: () => set({ user: null, isAuthenticated: false, pets: [], selectedPet: null }),
      
      setTheme: (theme) => {
        set({ theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },
      
      setLanguage: (language) => set({ language }),
      
      setPets: (pets) => set({ pets }),
      
      addPet: (pet) => set((state) => ({ pets: [...state.pets, pet] })),
      
      selectPet: (pet) => set({ selectedPet: pet }),
      
      switchRole: (role) => set((state) => ({
        user: state.user ? { ...state.user, role } : null
      })),
    }),
    {
      name: 'pet-transport-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        pets: state.pets,
      }),
    }
  )
);
