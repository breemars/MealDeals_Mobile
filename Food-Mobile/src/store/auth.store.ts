import { User } from 'firebase/auth';
import { create } from 'zustand'
import { auth } from "../lib/firebase";

//Any component can access this to determine if the user is authenticated, etc

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    setIsAuthenticated: (value) => set({isAuthenticated: value}),
    setUser: (user) => set({user}),
    setLoading: (value) => set({isLoading: value}),

    fetchAuthenticatedUser: async() => {

        set({isLoading: true})

        try {
            console.log(auth.currentUser)
            if(auth.currentUser) set({isAuthenticated: true, user: auth.currentUser as User})
            else set({isAuthenticated: false, user: null})
        } catch (error) {
            console.log("auth store error", error)
            set({isAuthenticated: false, user: null})
            
        } finally {
            set({isLoading: false})
        }
        
    },
}))

export default useAuthStore;