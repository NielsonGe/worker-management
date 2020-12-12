import { toastController } from '@ionic/vue';

function ToastUtils() {
  const showError = async(color: string, duration: number, message: string) => {
    const toast = await toastController.create({
      color: color,
      duration: duration,
      message: message
    });
  
    await toast.present();
  }
  const showSuccess = async(message: string) => {
    const toast = await toastController.create({
      color: "success",
      duration: 1500,
      message
    });
    await toast.present();
  }
  return {
    showError,
    showSuccess
  }
}

export { ToastUtils }