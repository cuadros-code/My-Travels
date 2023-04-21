import { JSX, createMemo, splitProps } from 'solid-js';
import styles from './Input.module.css'

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  value: string | number | undefined;
}

const Input = ( props: InputProps) => {

  const [, inputProps] = splitProps(props, [
    'class',
    'value',
    'error',
  ]);

  const getValue = createMemo<string | number | undefined>(
    (prevValue) =>
      props.value === undefined
        ? ''
        : !Number.isNaN(props.value)
        ? props.value
        : prevValue,
    ''
  );

  return (
    <>
      <input
        {...inputProps}
        class={styles.input} 
        id={props.name}
        value={getValue()}
      />
      {props.error && <div class={styles['message-error']}>{props.error}</div>}
    </>
  );
}

export default Input;