import { createSignal } from "solid-js";
import { useLocation, A } from "solid-start";
import { Button } from "~/components";
import { authStore, signOutSession } from "~/store/authStore";

const Navbar = () => {

  const [count, setCount] = createSignal(0);
  const location = useLocation();


  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";

  return (
    <nav class="bg-sky-800">
      <ul class="container flex items-center p-3 text-gray-200">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <A href="/">Home</A>
        </li>
        <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
          <A href="/about">About</A>
        </li>
        <li class={`border-b-2 ${active("/profile")} mx-1.5 sm:mx-6`}>
          <A href="/profile">Profile</A>
        </li>
      </ul>
      {
        authStore.user &&
          <Button onclick={signOutSession}>
            Cerrar Sesión
          </Button>
      }
    </nav>
  );
}

export default Navbar;