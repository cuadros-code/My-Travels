import { createSignal } from "solid-js";
import { Button, Input, LoadingIndicator } from '~/components'
import { authStore, signInWithGoogle } from "~/store/authStore";
import { createForm, Form, Field, required, email, minLength } from '@modular-forms/solid';
import styles from '~/styles/auth.module.css'
import { LoginForm, RegisterForm } from "~/interfaces/auth.interfaces";

const [ style, setStyle ] = createSignal('');

export default function Auth() {

  const loginForm = createForm<LoginForm>();
  const registerForm = createForm<RegisterForm>();

  const onLogin = (data: LoginForm) => {
    console.log(data);
  }

  const onRegister = (data: RegisterForm) => {
    console.log(data);
  }

  const onSignInWithGoogle = () => {
    signInWithGoogle()
  }
  
  return (
    <div class={styles.content}>
      <div class={`${styles.container} ${ styles[style()] }`}>
        <div class={`${styles['form-container']} ${styles['sign-up-container']}`}>
            <Form 
              of={registerForm} 
              onSubmit={onRegister} 
              autocomplete="off"
              class={styles.form}
            >
              <h1 class={styles.title}>Creá tu cuenta</h1>
              <Input
                of={registerForm}
                type="text" 
                placeholder="Nombre completo" 
                required
                name="name"
                validate={[
                  required('Por favor ingresa tu nombre'),
                ]}
              />
              <Input
                of={registerForm}
                type="email"
                placeholder="Correo electrónico"
                required
                name="email"
                validate={[
                  required('Por favor ingresa tu correo.'),
                  email('El correo ingresado no es válido.'),
                ]}
              />
              <Input
                of={registerForm}
                type="password"
                placeholder="Contraseña"
                required
                name="password"
                validate={[
                  required('Por favor ingresa tu contraseña.'),
                  minLength(8, 'La contraseña debe tener 8 caracteres o más.'),
                ]}
              />
              <Button type="submit">Crear cuenta</Button>
              <Button 
                class={styles.social} 
                onclick={onSignInWithGoogle}
              >
                {
                  authStore.loading
                  ? <LoadingIndicator></LoadingIndicator>
                  : <>
                      <img src="google.svg" alt="" />
                      <span>
                        Regístrate con Google
                      </span>
                    </>   
                }
              </Button>
            </Form>
        </div>
        <div class={`${styles['form-container']} ${styles['log-in-container']}`}>
            <Form 
              of={loginForm} 
              onSubmit={onLogin} 
              autocomplete="off" 
              class={styles.form}
            >
                <h1 class={styles.title}>Bienvenido</h1>
                <Input
                  of={loginForm}
                  type="email"
                  placeholder="Correo electrónico"
                  required
                  name="email"
                  validate={[
                    required('Por favor ingresa tu correo.'),
                    email('El correo ingresado no es válido.'),
                  ]}
                />
                <Input
                  of={loginForm}
                  type="password"
                  placeholder="Contraseña"
                  required
                  name="password"
                  validate={[
                    required('Por favor ingresa tu contraseña.'),
                    minLength(8, 'La contraseña debe tener 8 caracteres o más.'),
                  ]}
                />
                <a class={styles.link} href="#">¿Olvidaste tu contraseña?</a>
                <Button type="submit">Iniciar Sesión</Button>
                <Button 
                  class={styles.social} 
                  onclick={onSignInWithGoogle}
                  type="button"
                >
                  <>
                    {
                      authStore.loading 
                      ? <LoadingIndicator></LoadingIndicator>
                      : <>
                          <img src="google.svg" alt="" />
                          <span>
                            Inicia sesión con Google
                          </span>
                        </>
                    }
                  </>
                </Button>
            </Form>
        </div>
        <div class={styles['overlay-container']}>
            <div class={styles['overlay']}>
                <div class={`${styles['overlay-panel']} ${styles['overlay-left']}`}>
                    <h1 class={styles['title-panel']}>Bienvenido</h1>
                    <p class={styles['subtitle-panel']}>Si ya tienes una cuenta, inicia sesión</p>
                    <Button 
                      onclick={() => setStyle('')} 
                      class={styles.ghost} 
                    >
                      Iniciar Sesión
                    </Button>
                </div>
                <div class={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
                    <h1 class={styles['title-panel']}>Hola</h1>
                    <p class={styles['subtitle-panel']}>
                      Todavía no tienes una cuenta? Registrate
                    </p>
                    <Button 
                      onclick={() => setStyle('right-panel-active')} 
                      class={styles.ghost} 
                    >
                      Registrate
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
