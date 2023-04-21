import { createEffect, createSignal } from "solid-js";
import { Button, Input, LoadingIndicator } from '~/components'
import { authStore, signInWithGoogle, registerUser, signInUser } from "~/store/authStore";
import { createForm, email, minLength, required, reset } from '@modular-forms/solid';
import styles from '~/styles/auth.module.css'
import { LoginForm, RegisterForm } from "~/interfaces/auth.interfaces";

const [ style, setStyle ] = createSignal('');

export default function Auth() {

  const [loginForm, { Form, Field }] = createForm<LoginForm>();
  const [registerForm, { Form: RegisterForm, Field: RegisterField }] = createForm<RegisterForm>();

  createEffect(() => {
    if(authStore.error) {
      reset(loginForm, 'password');
      reset(registerForm, 'password');
    }
  })

  const onLogin = (data: LoginForm) => {
    signInUser({
      email: data.email, 
      password: data.password
    });
  }

  const onRegister = (data: RegisterForm) => {
    registerUser({
      email: data.email, 
      password: data.password, 
      name: data.name
    });
  }

  const onSignInWithGoogle = () => {    
    signInWithGoogle()
  }
  
  return (
    <div class={styles.content}>
    
      <div class={`${styles.container} ${ styles[style()] }`}>
        <div class={`${styles['form-container']} ${styles['sign-up-container']}`}>
        <RegisterForm
          onSubmit={onRegister}
          class={styles.form}
        >
          <h1 class={styles.title}>Bienvenido</h1>
          <RegisterField
            name="name"
            validate={[
              required('Por favor ingresa tu nombre.'),
            ]}
          >
            {(field, props) => (
              <>
                <Input
                  {...props}
                  value={field.value}
                  error={field.error}
                  type="email"
                  placeholder="Nombre completo"
                  required
                />
              </>
            )}
          </RegisterField>
          <RegisterField
            name="email"
            validate={[
              required('Por favor ingresa tu correo.'),
              email('El correo ingresado no es válido.'),
            ]}
          >
            {(field, props) => (
              <>
                <Input
                  {...props}
                  value={field.value}
                  error={field.error}
                  type="email"
                  placeholder="Correo electrónico"
                  required
                />
              </>
            )}
          </RegisterField>

          <RegisterField
            name="password"
            validate={[
              required('Por favor ingresa tu contraseña.'),
              minLength(8, 'La contraseña debe tener 8 caracteres o más.'),
            ]}
          >
            {(field, props) => (
              <>
                <Input
                  {...props}
                  value={field.value}
                  error={field.error}
                  type="password"
                  placeholder="Contraseña"
                  required
                />
              </>
            )}
          </RegisterField>
          <Button type="submit">Registrarse</Button>

          <Button 
              type="button"
              class={styles.social} 
              onClick={onSignInWithGoogle}
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
          </RegisterForm>
        </div>
        <div class={`${styles['form-container']} ${styles['log-in-container']}`}>
            <Form
              onSubmit={onLogin}
              class={styles.form}
            >
              <h1 class={styles.title}>Bienvenido</h1>
              <Field
                name="email"
                validate={[
                  required('Por favor ingresa tu correo.'),
                  email('El correo ingresado no es válido.'),
                ]}
              >
                {(field, props) => (
                  <>
                    <Input
                      {...props}
                      value={field.value}
                      error={field.error}
                      type="email"
                      placeholder="Correo electrónico"
                      required
                    />
                  </>
                )}
              </Field>

              <Field
                name="password"
                validate={[
                  required('Por favor ingresa tu contraseña.'),
                  minLength(8, 'La contraseña debe tener 8 caracteres o más.'),
                ]}
              >
                {(field, props) => (
                  <>
                    <Input
                      {...props}
                      value={field.value}
                      error={field.error}
                      type="password"
                      placeholder="Contraseña"
                      required
                    />
                  </>
                )}
              </Field>
              <a class={styles.link} href="#">¿Olvidaste tu contraseña?</a>
              <Button type="submit">Iniciar Sesión</Button>

              <Button 
                type="button"
                class={styles.social} 
                onClick={onSignInWithGoogle}
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
