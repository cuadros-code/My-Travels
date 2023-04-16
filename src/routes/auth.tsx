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
