import { FirebaseError } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword
  } from "firebase/auth";
import { createStore } from "solid-js/store";
import { googleProvider } from "~/config/firebase";
import { AuthProps, LoginForm, RegisterForm } from "~/interfaces/auth.interfaces";


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
    if( auth.currentUser ){
      await updateProfile(auth.currentUser, { displayName: name })
    }
    setAuthStore({ user })

  } catch (errors) {
    let error = errors as FirebaseError
    setAuthStore({ error })
  } finally {
    setAuthStore({loading: false})
  }
}

export const signInUser = async ({ email, password }: LoginForm ) => {
  try {
    const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    setAuthStore({ user })
  } catch (errors) {
    let error = errors as FirebaseError
    setAuthStore({ error })
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