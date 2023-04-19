import { createSignal } from "solid-js";
import { Button, LoadingIndicator } from '~/components'
import { authStore, signInWithGoogle } from "~/store/authStore";
import { createForm, Form, Field, required, email, minLength } from '@modular-forms/solid';
import styles from '~/styles/auth.module.css'

const [ style, setStyle ] = createSignal('');

export default function Auth() {

  const loginForm = createForm<LoginForm>();

  const onSignInWithGoogle = () => {
    signInWithGoogle()
  }
  
  return (
    <div class={styles.content}>
      <div class={`${styles.container} ${ styles[style()] }`}>
        <div class={`${styles['form-container']} ${styles['sign-up-container']}`}>
            <Form of={loginForm} onSubmit={() => {}}>
              <h1 class={styles.title}>Creá tu cuenta</h1>
                <input type="text" placeholder="Nombre completo" />
                <input type="email" placeholder="Correo" />
                <input type="password" placeholder="Contraseña" />
                <Button>Crear cuenta</Button>
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
            <Form of={loginForm} onSubmit={() => {}} >
                <h1 class={styles.title}>Bienvenido</h1>
                <Field
                  of={loginForm}
                  name="email"
                  validate={[
                    required('Please enter your email.'),
                    email('The email address is badly formatted.'),
                  ]}
                >
                  {(field) => (
                    <>
                      <input {...field.props} type="email" placeholder="Correo" required />
                      {field.error && <div>{field.error}</div>}
                    </>
                  )}
                </Field>
                <Field
                  of={loginForm}
                  name="password"
                  validate={[
                    required('Please enter your password.'),
                    minLength(8, 'You password must have 8 characters or more.'),
                  ]}
                >
                  {(field) => (
                    <>
                      <input {...field.props} type="password" placeholder="Contraseña" required />
                      {field.error && <div>{field.error}</div>}
                    </>
                  )}
                </Field>
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
