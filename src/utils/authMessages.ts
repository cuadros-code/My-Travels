
interface AuthErrorMessages {
  [key: string]: string
}

export const authErrorMessages: AuthErrorMessages = {
  'auth/invalid-email'        : 'Correo o contraseña inválidos',
  'auth/user-disabled'        : 'Usuario deshabilitado',
  'auth/email-already-exists' : 'El correo ya está registrado',
  'auth/invalid-password'     : 'Correo o contraseña inválidos',
  'auth/user-not-found'       : 'Correo o contraseña inválidos',
  'auth/wrong-password'       : 'Correo o contraseña inválidos',
  'auth/email-already-in-use' : 'El correo ya está registrado',
}