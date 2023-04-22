import { createStore } from 'solid-js/store';
import styles from './Alert.module.css'
import { Show, createEffect, onCleanup } from 'solid-js';

export const [alert, setAlertState] = createStore({
  open: false,
  message: 'Error',
  description: 'Error description here',
  type: 'success' as 'success' | 'error' | 'warning' | 'info',
});

const Alert = () => {

  createEffect(() => {
    if (alert.open) {
      const interval = setTimeout(() => {
        setAlertState({ open: false });
      }, 5000);

      onCleanup(() => {
        clearTimeout(interval);
      });
    }
  });

  return (
    <Show when={alert.open === true} fallback={<></>}>
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
    </Show>
  )
}

export default Alert