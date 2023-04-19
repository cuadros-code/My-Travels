import { FirebaseError } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, User, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { createStore } from "solid-js/store";
import { googleProvider } from "~/config/firebase";

interface AuthProps {
  token   : string | null  
  user    : User | null,
  loading : boolean,
  error   : FirebaseError | null
}

export const [authStore, setAuthStore] = createStore<AuthProps>({
  user    : null,
  loading : false,
  error   : null,
  token   : null
});

export const signInWithGoogle = async () => {
  try {
    setAuthStore({loading: true})
    const auth = getAuth()
    const signPopup = await signInWithPopup(auth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(signPopup)
    const token = credential?.accessToken
    const user = signPopup.user
    setAuthStore({ user, token })

  } catch (errors) {
    let error = errors as FirebaseError
    const errorCode = error.code
    const errorMessage = error.message
    const email = error.customData?.email
    const credential = GoogleAuthProvider.credentialFromError(error)
    setAuthStore({ error})
    
  } finally {
    setAuthStore({loading: false})
  }
}

export const registerUser = async ({ name, email, password }: RegisterForm ) => {
  try {
    const auth = getAuth()
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
  } catch (errors) {
    let error = errors as FirebaseError
    setAuthStore({ error})
    
  } finally {
    setAuthStore({loading: false})
  }
}


export const signOutSession = async () => {
  try {
    const auth = getAuth()
    await signOut(auth)
    setAuthStore({
      user    : null,
      loading : false,
      error   : null,
      token   : null
    })

  } catch (errors) {
    let error = errors as FirebaseError
    setAuthStore({ error})

  } finally {
    setAuthStore({loading: false})
  }
}