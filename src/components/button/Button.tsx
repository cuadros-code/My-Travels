import { JSX } from 'solid-js';
import styles from './Button.module.css'

interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
}

const Button = ( { children, ...rest }: Props ) => {
  return (
    <button
      {...rest}
      class={`${styles.button} ${rest.class}`}
    >
      {children}
    </button>
  );
}

export default Button;