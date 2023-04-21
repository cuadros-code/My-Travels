import { createStore } from 'solid-js/store';
import styles from './Alert.module.css'

export const [alert, setAlertState] = createStore({
  open: false,
  message: 'Error',
  description: 'El usuario o la contraseña son incorrectos',
  type: 'info' as 'success' | 'error' | 'warning' | 'info',
});

const Alert = () => {

  return (
    <div 
      role="alert"
      class={`${styles.alert} ${styles[`alert-${alert.type}`]}`} 
    >
      <button 
        class={`${styles.button} ${styles[`button-${alert.type}`]}`}
      >
        <img src={`${alert.type}.svg`} alt="" />
      </button>
      <div>
        <h3 
          class={`${styles.title} ${styles[`title-${alert.type}`]}`}
        >
          {alert.message}
        </h3>
        <p 
          class={`${styles.description} ${styles[`description-${alert.type}`]}`}
        >
          {alert.description}
        </p>
      </div>
    </div>
  )
}

export default Alert