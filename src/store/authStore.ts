import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createStore } from "solid-js/store";
import { googleProvider } from "~/config/firebase";

export const [authStore, setAuthStore] = createStore({
  user: null,
  loading: false,
  error: null,
});

export const signInWithGoogle = async () => {
  try {
    setAuthStore({loading: true})
    const auth = getAuth()
    const credential = await signInWithPopup(auth, googleProvider)
    
  } catch (error) {
    
  } finally {
    setAuthStore({loading: false})
  }
}