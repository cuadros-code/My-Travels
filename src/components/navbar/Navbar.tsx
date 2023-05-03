import { createSignal } from "solid-js";
import { useLocation, A, useNavigate } from "solid-start";
import { Button } from "~/components";
import { authStore, signOutSession } from "~/store/authStore";
import styles from  './Navbar.module.css'

const Navbar = () => {

  const [isOpen, setIsOpen] = createSignal(false);
  const navigate = useNavigate()

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav class={styles.nav}>
      <div class={styles.logo}>
        <A href="/">Logo</A>
      </div>
      <ul class={styles.links}>
        <li class={styles.link}>
          <A href="/">Inicio</A>
        </li>
        <li class={styles.link}>
          <A href="/">Publicar</A>
        </li>
        <li class={styles.link}>
          <A href="/">Contacto</A>
        </li>
        {
          authStore.user ? 
          <>
            <li class={styles.link}>
              <A href="/">Perfil</A>
            </li>
            <li>
              <Button onclick={signOutSession} >Cerrar sesion</Button>
            </li>
          </>
          :
          <>
            <li>
              <Button onclick={() => navigate('/auth')}>
                Iniciar sesion
              </Button>
            </li>
          </>
        }
      </ul>
    </nav>
  );
}

export default Navbar;