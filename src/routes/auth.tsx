import { createSignal } from "solid-js";
import { Button, LoadingIndicator } from '~/components'
import { authStore, signInWithGoogle } from "~/store/authStore";
import styles from '~/styles/auth.module.css'

const [ style, setStyle ] = createSignal('');

export default function Auth() {

  const onSignInWithGoogle = () => {
    signInWithGoogle()
  }
  
  return (
    <div class={styles.content}>
      <div class={`${styles.container} ${ styles[style()] }`}>
        <div class={`${styles['form-container']} ${styles['sign-up-container']}`}>
            <form action="#">
                <h1 class={styles.title}>Creá tu cuenta</h1>
                <input type="text" placeholder="Nombre completo" />
                <input type="email" placeholder="Correo" />
                <input type="password" placeholder="Contraseña" />
                <Button>Crear cuenta</Button>
                <Button class={styles.social} >
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
            </form>
        </div>
        <div class={`${styles['form-container']} ${styles['log-in-container']}`}>
            <form action="#">
                <h1 class={styles.title}>Bienvenido</h1>
                <input type="email" placeholder="Correo" />
                <input type="password" placeholder="Contraseña" />
                <a class={styles.link} href="#">¿Olvidaste tu contraseña?</a>
                <Button>Iniciar Sesión</Button>
                <Button 
                  class={styles.social} 
                  onclick={onSignInWithGoogle}
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
            </form>
        </div>
        <div class={styles['overlay-container']}>
            <div class={styles['overlay']}>
                <div class={`${styles['overlay-panel']} ${styles['overlay-left']}`}>
                    <h1>Welcome Back!</h1>
                    <p>Already have an account? Log In</p>
                    <Button onclick={() => setStyle('')} class={styles.ghost} id="logIn">Log In</Button>
                </div>
                <div class={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
                    <h1>Hello, There!</h1>
                    <p>Don't have an account? Sign Up Free</p>
                    <Button onclick={() => setStyle('right-panel-active')} class={styles.ghost} id="signUp">Sign Up</Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
