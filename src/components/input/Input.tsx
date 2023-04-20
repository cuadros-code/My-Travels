import { JSX } from 'solid-js';
import styles from './Input.module.css'
import { Field, FieldValue, FieldValues, FormState, Maybe, ValidateField } from '@modular-forms/solid';

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  validate ?: ValidateField<Maybe<any | any | any[] | any[]>> 
            | ValidateField<Maybe<any | any | any[] | any[]>>[] 
            | undefined,
  of        : FormState<any>
  name      : string
}

const Input = ({ name, of, validate ,...rest }: InputProps) => {
  return (
    <Field
      of={of}
      name={name}
      validate={validate}
    >
      {(field) => (
        <>
          <input class={styles.input} {...field.props} {...rest} />
          {field.error && <div class={styles['message-error']}>{field.error}</div>}
        </>
      )}
    </Field>
  );
}

export default Input;