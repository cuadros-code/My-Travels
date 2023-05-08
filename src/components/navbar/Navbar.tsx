import { createSignal } from "solid-js";
import { useLocation, A, useNavigate } from "solid-start";
import { Button } from "~/components";
import { authStore, signOutSession } from "~/store/authStore";
import styles from  './Navbar.module.css'

const Navbar = () => {

  const [isOpen, setIsOpen] = createSignal(false);
  const navigate = useNavigate()

  const location = useLocation();
  const active = (path: string) => path == location.pathname && "active-route"
  

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav class={styles.nav}>
      <div class={styles.logo}>
        <A href="/">
          <img src="logo.png" alt="" />
          <h1>HuellasAmigas</h1>
        </A>
      </div>
      <ul class={styles.links}>
        <li class={`${styles.link} ${active('/')}`}>
          <A href="/">Inicio</A>
          <span></span>
        </li>
        <li class={styles.link}>
          <A href="/">Publicar</A>
          <span></span>
        </li>
        <li class={styles.link}>
          <A href="/">Contacto</A>
          <span></span>
        </li>
        {
          authStore.user ? 
          <>
            <li class={`${styles.link} ${active('/profile')}`}>
              <A href="/profile">Perfil</A>
              <span></span>
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