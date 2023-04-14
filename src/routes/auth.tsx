import { createSignal } from "solid-js";
import '~/styles/auth.css'

const [ style, setStyle ] = createSignal('');

export default function Auth() {

  return (
    <div class={`container ${style()}`}>
      <div class="form-container sign-up-container">
          <form action="#">
              <h1>Create Account</h1>
              <div class="social-container">
                  <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                  <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                  <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button >Sign Up</button>
          </form>
      </div>
      <div class="form-container log-in-container">
          <form action="#">
              <h1>Log in</h1>
              <div class="social-container">
                  <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                  <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                  <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
              </div>
              <span>or use your account</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">Forgot your password?</a>
              <button>Log In</button>
          </form>
      </div>
      <div class="overlay-container">
          <div class="overlay">
              <div class="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>Already have an account? Log In</p>
                  <button  onclick={() => setStyle('')} class="ghost" id="logIn">Log In</button>
              </div>
              <div class="overlay-panel overlay-right">
                  <h1>Hello, There!</h1>
                  <p>Don't have an account? Sign Up Free</p>
                  <button onclick={() => setStyle('right-panel-active')} class="ghost" id="signUp">Sign Up</button>
              </div>
          </div>
      </div>
    </div>
  );
}
