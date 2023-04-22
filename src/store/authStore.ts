import { FirebaseError } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword,
    onAuthStateChanged
  } from "firebase/auth";
import { createStore } from "solid-js/store";
import { setAlertState } from "~/components/alert/Alert";
import { googleProvider } from "~/config/firebase";
import { AuthProps, LoginForm, RegisterForm } from "~/interfaces/auth.interfaces";
import { authErrorMessages } from "~/utils/authMessages";

const auth = getAuth()

export const [authStore, setAuthStore] = createStore<AuthProps>({
  user    : null,
  loading : false,
  error   : null,
  token   : null
});

export const signInWithGoogle = async () => {
  try {
    setAuthStore({loading: true})
    const signPopup = await signInWithPopup(auth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(signPopup)
    const token = credential?.accessToken
    const user = signPopup.user
    setAuthStore({ user, token })

  } catch (errors) {
    let error = errors as FirebaseError
    setAuthStore({ error})
    callAlert(error)
  } finally {
    setAuthStore({loading: false})
  }
}

export const registerUser = async ({ name, email, password }: RegisterForm ) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    if( auth.currentUser ){
      await updateProfile(auth.currentUser, { displayName: name })
    }
    setAuthStore({ user })

  } catch (errors) {
    let error = errors as FirebaseError
    setAuthStore({ error })
    callAlert(error)
  } finally {
    setAuthStore({loading: false})
  }
}

export const signInUser = async ({ email, password }: LoginForm ) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    setAuthStore({ user })
  } catch (errors) {
    let error = errors as FirebaseError
    setAuthStore({ error })
    callAlert(error)
  } finally {
    setAuthStore({loading: false})
  }
}

export const signOutSession = async () => {
  try {
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
    callAlert(error)
  } finally {
    setAuthStore({loading: false})
  }
}

export const authListener = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthStore({ user })
    } else {
      setAuthStore({ user: null })
    }
  })
}

const callAlert = ( error: FirebaseError ) => {
  setAlertState({
    description: authErrorMessages[error.code] || 'Error desconocido',
    message    : 'Error',
    open       : true,
    type: 'error',
  })
}