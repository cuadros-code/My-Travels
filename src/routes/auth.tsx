import { createSignal } from "solid-js";
import { Button } from '~/components'
import styles from '~/styles/auth.module.css'


export default function Auth() {
  
  const [ style, setStyle ] = createSignal('');

  return (
    <div class={`${styles.container} ${ styles[style()] }`}>
      <div class={`${styles['form-container']} ${styles['sign-up-container']}`}>
          <form action="#">
              <h1>Create Account</h1>
              <div class={`${styles["social-container"]}`}>
                  <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                  <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                  <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <Button >Sign Up</Button>
          </form>
      </div>
      <div 
        class={`${styles['form-container']} ${styles['log-in-container']}`}>
          <form action="#">
              <h1>Log in</h1>
              <div class={`${styles["social-container"]}`}>
                  <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                  <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                  <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
              </div>
              <span>or use your account</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forgot your password?</a>
              <Button>Log In</Button>
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
  );
}
